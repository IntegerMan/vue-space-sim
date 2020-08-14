export default {
    randomDegree() {
        return Math.floor(Math.random() * 360);
    },
    randomInt(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    },
    randomPos(sector, margin) {
        return {
            x: this.randomInt(margin.x, sector.size.x - margin.x),
            y: this.randomInt(margin.y, sector.size.y - margin.y),
        };
    },
};
