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
        let newContacts = [];

        const newSector = {
            ...sector,
            // Using compact here to remove null entries representing contacts that no longer exist
            ships: _.compact(
                sector.ships.map(c => {
                    const context = {
                        contact: c,
                        uiState,
                        newContacts: [],
                    };

                    const simResult = this.simulate(context);

                    // Add any new contacts to our array
                    if (simResult.newContacts && simResult.newContacts.length) {
                        newContacts = _.concat(newContacts, ...simResult.newContacts);
                    }

                    return simResult.contact;
                })
            ),
        };

        // Add any new contacts
        newContacts.forEach(c => newSector.ships.push(c));

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
        if (!context.contact) return context;

        let ticksLeft = context.contact.ticksLeft;
        if (ticksLeft !== undefined) {
            if (--ticksLeft <= 0) {
                console.debug('Despawning projectile', context.contact);
                return { ...context, contact: null };
            }
        }

        return {
            ...context,
            contact: {
                ...context.contact,
                ticksLeft,
                heading: VectorHelper.steerTowardsHeading(
                    context.contact.heading,
                    context.contact.desiredHeading,
                    ComponentService.getLargestValue(
                        ComponentService.getActiveComponentsOfType(
                            context.contact.components,
                            'RCS'
                        ),
                        r => r.turnSpeed
                    )
                ),
                throttle: VectorHelper.moveTowardsSetThrottle(
                    context.contact.throttle,
                    context.contact.desiredThrottle,
                    ComponentService.getLargestValue(
                        ComponentService.getActiveComponentsOfType(
                            context.contact.components,
                            'ENGINE'
                        ),
                        e => e.maxAcceleration
                    )
                ),
            },
        };
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

        // Advance the ship given the current position, thrust, and heading
        const newPos = VectorHelper.calculateNewPosition(
            contact.pos,
            contact.heading,
            contact.thrust
        );

        // Check to see if we've reached our current nav target
        let targetPos = contact.navTarget;
        if (targetPos && VectorHelper.calculateDistance(contact.pos, targetPos) <= 5) {
            targetPos = undefined;
        }

        // If we don't have a navigational target anymore, we must have arrived at our destination. Land / jump.
        if (!contact.isPlayer && !targetPos && ShipService.isMobile(contact)) {
            return { ...context, contact: null };
        }

        // Return a modified version of the ship
        return {
            ...context,
            contact: {
                ...contact,
                pos: newPos,
                navTarget: targetPos,
            },
        };
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

            return { ...context, newContacts: _.concat(context.newContacts, ...projectiles) };
        } else {
            return context;
        }
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
