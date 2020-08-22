import _ from 'lodash/fp';

import VectorHelper from '../helpers/VectorHelper.js';
import SectorService from './SectorService';
import ShipService from './ShipService';
import ComponentService from './ComponentService';

export default {
    /**
     * Simulates the sector and returns a new version of that sector
     * @param {Object} sector the sector the contacts are in
     * @returns {Object} the new sector
     */
    simulateAll(sector) {
        const newSector = {
            ...sector,
            ships: _.compact(sector.ships.map(c => this.simulate(c))),
        };

        if (sector.timeBetweenShipSpawn <= 0) {
            const numShips = newSector.ships.filter(s => !s.isPlayer).length;

            if (numShips < newSector.maxAiShips) {
                SectorService.getRandomTasksForSector(newSector, 1)
                    .map(task => SectorService.generateShipForTask(newSector, task))
                    .filter(s => s)
                    .forEach(s => {
                        console.debug('New Contact created', s);
                        newSector.ships.push(s);
                        newSector.timeBetweenShipSpawn = sector.minTimeBetweenShipSpawn;
                    });
            }
        } else {
            newSector.timeBetweenShipSpawn -= 1;
        }

        return newSector;
    },
    /**
     * Simulates an individual contact and returns the new version of that contact
     * @param {Object} contact the contact to simulate
     * @returns {Object} the updated contact
     */
    simulate(contact) {
        const simFunc = _.compose(this.adjustSystems, this.updatePosition);
        return simFunc(contact);
    },
    adjustSystems(contact) {
        if (!contact) return null;

        return {
            ...contact,
            heading: VectorHelper.steerTowardsHeading(
                contact.heading,
                contact.desiredHeading,
                ComponentService.getLargestValue(
                    ComponentService.getActiveComponentsOfType(contact.components, 'RCS'),
                    r => r.turnSpeed
                )
            ),
            throttle: VectorHelper.moveTowardsSetThrottle(
                contact.throttle,
                contact.desiredThrottle,
                ComponentService.getLargestValue(
                    ComponentService.getActiveComponentsOfType(contact.components, 'ENGINE'),
                    e => e.maxAcceleration
                )
            ),
        };
    },
    updatePosition(contact) {
        if (!contact) return null;

        // Advance the ship given the current position, thrust, and heading
        const throttlePercent = contact.throttle / 100;
        const newPos = VectorHelper.calculateNewPosition(
            contact.pos,
            contact.heading,
            throttlePercent *
                ComponentService.getLargestValue(
                    ComponentService.getActiveComponentsOfType(contact.components, 'ENGINE'),
                    e => e.maxThrust
                )
        );

        // Check to see if we've reached our current nav target
        let targetPos = contact.navTarget;
        if (targetPos && VectorHelper.calculateDistance(contact.pos, targetPos) <= 5) {
            targetPos = undefined;
        }

        // If we don't have a navigational target anymore, we must have arrived at our destination. Land / jump.
        if (!contact.isPlayer && !targetPos && ShipService.isMobile(contact)) {
            return null;
        }

        // Return a modified version of the ship
        return {
            ...contact,
            pos: newPos,
            navTarget: targetPos,
        };
    },
};
