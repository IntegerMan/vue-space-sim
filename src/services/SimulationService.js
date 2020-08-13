import VectorHelper from '../helpers/VectorHelper.js';
import fp from 'lodash/fp';
import ShipDefinitionService from './ShipDefinitionService';

export default {
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
        return {
            ...contact,
            pos: VectorHelper.calculateNewPosition(
                contact.pos,
                contact.heading,
                (contact.throttle / 100) * ShipDefinitionService.getMaxThrust(contact)
            ),
        };
    },
    simulate(contact) {
        return fp.compose(this.adjustSystems, this.updatePosition)(contact);
    },
};
