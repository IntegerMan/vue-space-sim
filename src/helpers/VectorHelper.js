export default {
    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    },

    calculateNewPosition(pos, headingInDegrees, thrust) {
        const radians = this.degreesToRadians(headingInDegrees);
        const modX = thrust * Math.sin(radians);
        const modY = thrust * Math.cos(radians);
        console.log(modX, modY);

        return { x: pos.x + modX, y: pos.y - modY };
    },
};
