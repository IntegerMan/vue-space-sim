import _ from 'lodash/fp';

import VectorHelper from '../helpers/VectorHelper.js';
import ShipDefinitionService from './ShipDefinitionService';

export default {
    /**
     * Simulates all contacts and returns a new array of contacts
     * @param {Object[]} contacts the current contacts
     * @returns {Object[]} the new contacts
     */
    simulateAll(contacts) {
        return contacts.map(c => this.simulate(c));
    },
    /**
     * Simulates an individual contact and returns the new version of that contact
     * @param {Object} contact the contact to simulate
     * @returns {Object} the updated contact
     */
    simulate(contact) {
        return _.compose(this.adjustSystems, this.updatePosition)(contact);
    },
    adjustSystems(contact) {
        return {
            ...contact,
            heading: VectorHelper.steerTowardsHeading(
                contact.heading,
                contact.desiredHeading,
                ShipDefinitionService.getMaxTurn(contact)
            ),
            throttle: VectorHelper.moveTowardsSetThrottle(
                contact.throttle,
                contact.desiredThrottle,
                ShipDefinitionService.getMaxAcceleration(contact)
            ),
        };
    },
    updatePosition(contact) {
        // Advance the ship given the current position, thrust, and heading
        const newPos = VectorHelper.calculateNewPosition(
            contact.pos,
            contact.heading,
            (contact.throttle / 100) * ShipDefinitionService.getMaxThrust(contact)
        );

        // Check to see if we've reached our current nav target
        let targetPos = contact.navTarget;
        if (targetPos && VectorHelper.calculateDistance(contact.pos, targetPos) < 1) {
            targetPos = undefined;
        }

        return {
            ...contact,
            pos: newPos,
            navTarget: targetPos,
        };
    },
};
