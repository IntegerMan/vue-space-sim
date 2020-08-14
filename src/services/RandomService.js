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
};
