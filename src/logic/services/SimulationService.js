import _ from 'lodash/fp';

import VectorHelper from '../helpers/VectorHelper.js';
import SectorService from './SectorService';
import ShipService from './ShipService';
import ComponentService from './ComponentService';

export default {
    /**
     * Simulates the sector and returns a new version of that sector
     * @param {Object} sector the sector the contacts are in
     * @param {Object} uiState any flags from various controls that might be relevant to simulating
     * @returns {Object} the new sector
     */
    simulateAll(sector, uiState) {
        const newContacts = [];

        const originalShips = sector.ships.slice();

        for (const ship of originalShips) {
            const context = {
                contact: { ...ship },
                uiState,
                newContacts: [],
                otherContacts: originalShips.filter(s => s !== ship),
            };

            const simResult = this.simulate(context);

            // If the ship is still around, keep it around
            if (simResult.contact) {
                newContacts.push(simResult.contact);
            }

            // Add any new contacts to our array
            if (simResult.newContacts) {
                for (const contact of simResult.newContacts) {
                    newContacts.push(contact);
                }
            }
        }

        const newSector = { ...sector, ships: newContacts };

        // Spawn ships as needed
        if (sector.timeBetweenShipSpawn <= 0) {
            const numShips = newSector.ships.filter(s => !s.isPlayer).length;

            if (numShips < newSector.maxAiShips) {
                this.spawnForRandomTask(newSector);
            }
        } else {
            newSector.timeBetweenShipSpawn -= 1;
        }

        return newSector;
    },
    /**
     * Simulates an individual contact and returns the new version of that contact
     * @param {Object} context the simulation context for this contact
     * @returns {Object} the updated context
     */
    simulate(context) {
        const simFunc = _.compose(this.adjustSystems, this.updatePosition, this.launchProjectiles);
        return simFunc(context);
    },
    adjustSystems(context) {
        const contact = context.contact;

        if (!contact) return context;

        if (contact.ticksLeft !== undefined) {
            if (--contact.ticksLeft <= 0) {
                console.debug('Despawning projectile', context.contact);
                context.contact = null;
                return context;
            }
        }

        contact.heading = VectorHelper.steerTowardsHeading(
            context.contact.heading,
            context.contact.desiredHeading,
            ComponentService.getLargestValue(
                ComponentService.getActiveComponentsOfType(context.contact.components, 'RCS'),
                r => r.turnSpeed
            )
        );

        contact.throttle = VectorHelper.moveTowardsSetThrottle(
            context.contact.throttle,
            context.contact.desiredThrottle,
            ComponentService.getLargestValue(
                ComponentService.getActiveComponentsOfType(context.contact.components, 'ENGINE'),
                e => e.maxAcceleration
            )
        );

        return context;
    },
    updatePosition(context) {
        const contact = context.contact;
        if (!contact) return context;

        // Figure out thrust for things that have engines
        const engines = ComponentService.getComponentsOfType(contact.components, 'ENGINE');
        if (engines.length || contact.thrust === undefined) {
            const throttlePercent = contact.throttle / 100;
            const bestThrust = ComponentService.getLargestValue(
                engines.filter(e => e.isOn),
                e => e.maxThrust
            );
            contact.thrust = throttlePercent * bestThrust;
        }

        if (ShipService.isMobile(contact)) {
            // Advance the ship given the current position, thrust, and heading
            let newPos = VectorHelper.calculateNewPosition(
                contact.pos,
                contact.heading,
                contact.thrust
            );

            if (contact.pos !== newPos) {
                // Generate intermediate points
                const points = VectorHelper.generatePointArray(contact.pos, newPos, 4);

                let collided = false;
                for (const pos of points) {
                    for (const c of context.otherContacts) {
                        if (VectorHelper.checkCollision(pos, contact.size, c.pos, c.size)) {
                            console.log('Collision detected', contact, c);
                            // TODO: This should probably damage both entities
                            collided = true;
                            break;
                        }
                    }

                    if (collided) {
                        break;
                    } else {
                        newPos = pos;
                    }
                }

                // Actually move
                context.contact.pos = newPos;
            }

            // Check to see if we've reached our current nav target
            if (
                contact.navTarget &&
                contact.pos.calculateDistance(contact.navTarget) <= 5
            ) {
                contact.navTarget = undefined;
            }

            // If we don't have a navigational target anymore, we must have arrived at our destination. Land / jump.
            if (!contact.isPlayer && !contact.navTarget) {
                context.contact = null;
            }
        }

        // Return a modified version of the ship
        return context;
    },
    launchProjectiles(context) {
        const contact = context.contact;
        const uiState = context.uiState;

        if (!contact) return context;

        if (uiState.isFiring && contact.id === 'PLAYER') {
            const projectiles = [];
            const weapons = ComponentService.getActiveComponentsOfType(
                contact.components,
                'WEAPON'
            );

            weapons.forEach(w => {
                const heading = VectorHelper.clampDegrees(contact.heading + uiState.aimPoint);

                const pos = VectorHelper.calculateNewPosition(
                    contact.pos, // TODO: May need to offset this
                    heading,
                    contact.size * 3 + w.projectileInfo.size
                );

                const proj = ShipService.createProjectile(contact, pos, heading, w.projectileInfo);
                projectiles.push(proj);
            });

            context.newContacts = _.concat(context.newContacts, ...projectiles);
        }

        return context;
    },
    spawnForRandomTask(sector) {
        SectorService.getRandomTasksForSector(sector, 1)
            .map(task => SectorService.generateShipForTask(sector, task))
            .filter(s => s)
            .forEach(s => {
                console.debug('New Contact created', s);
                sector.ships.push(s);
                sector.timeBetweenShipSpawn = sector.minTimeBetweenShipSpawn;
            });
    },
};
