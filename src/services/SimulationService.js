import VectorHelper from '../helpers/VectorHelper.js';

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
        // TODO: This is a prime candidate for functional composition
        contact = this.adjustSystems(contact);
        contact = this.updatePosition(contact);

        return contact;
    },
};
