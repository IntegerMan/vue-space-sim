import VectorHelper from '../helpers/VectorHelper.js';
import fp from 'lodash/fp';

export default {
    adjustSystems(contact) {
        return {
            ...contact,
            heading: VectorHelper.steerTowardsHeading(
                contact.heading,
                contact.desiredHeading,
                15 // TODO: Max Turn should live elsewhere
            ),
            thrust: VectorHelper.moveTowardsSetThrottle(
                contact.thrust,
                contact.desiredThrottle,
                15 // TODO: Max throttle change should live elsewhere
            ),
        };
    },
    updatePosition(contact) {
        return {
            ...contact,
            pos: VectorHelper.calculateNewPosition(contact.pos, contact.heading, contact.thrust),
        };
    },
    simulate(contact) {
        return fp.compose(this.adjustSystems, this.updatePosition)(contact);
    },
};
