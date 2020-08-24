export default {
    randomDegree() {
        return Math.floor(Math.random() * 360);
    },
    randomInt(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    },
    randomEnum(enumType) {
        const index = Math.floor(Math.random() * Object.keys(enumType).length);
        const key = Object.keys(enumType)[index];
        return enumType[key];
    },
    randomPos(sector, margin = { x: 100, y: 100 }) {
        return {
            x: this.randomInt(margin.x, sector.size.x - margin.x),
            y: this.randomInt(margin.y, sector.size.y - margin.y),
        };
    },
    /**
     * Returns either 1 or -1 depending on random number generation
     * @returns {Number} 1 or -1
     */
    randomSign() {
        return Math.round(Math.random()) === 0 ? -1 : 1;
    },
    /**
     * Displaces a point by random values in the X or y directions
     * @param {Object} pos the original point
     * @param {Number} radius a radius to move things around in
     */
    displace(pos, radius) {
        const deltaX = Math.random() * radius;
        const deltaY = radius - deltaX;
        return { x: pos.x + deltaX * this.randomSign(), y: pos.y + deltaY * this.randomSign() };
    },
};
