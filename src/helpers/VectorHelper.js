export default {
    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    },

    calculateNewPosition(pos, headingInDegrees, thrust) {
        const radians = this.degreesToRadians(headingInDegrees);
        const modX = thrust * Math.sin(radians);
        const modY = thrust * Math.cos(radians);

        return { x: pos.x + modX, y: pos.y - modY };
    },

    translateRelativeToPos(contact, pos, viewPortOffset) {
        return {
            ...contact,
            x: contact.x - pos.x + viewPortOffset.x,
            y: contact.y - pos.y + viewPortOffset.y,
        };
    },
};
