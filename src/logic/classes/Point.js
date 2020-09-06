import RandomService from '@/logic/services/RandomService';

/**
 *  Represents a two dimensional point in the world
 */
export default class Point {
    /**
     * Creates a new Point
     * @param {Number} x the X Position
     * @param {Number} y the Y Position
     */
    constructor(x, y) {
        this.x = Math.round(x);
        this.y = Math.round(y);

        // Do not allow things to update the point
        if (new.target === Point) {
            Object.freeze(this);
        }
    }

    /**
     * Calculates and returns the distance between two points
     *
     * @param {Point} otherPoint the second point
     * @returns {Number} the distance between the two points
     */
    calculateDistance(otherPoint) {
        // Pythagorean Theorem: a^2 + b^2 = c^2. Solving for c.
        return Math.sqrt((this.x - otherPoint.x) ** 2 + (this.y - otherPoint.y) ** 2);
    }

    /**
     * Randomly displaces this point within a certain radius and returns the new point.
     * @param {Number} radius the radius where the new point can live
     * @returns {Point} the new point
     */
    displace(radius) {
        const deltaX = Math.random() * radius;
        const deltaY = radius - deltaX;
        return new Point(
            this.x + deltaX * RandomService.randomSign(),
            this.y + deltaY * RandomService.randomSign()
        );
    }
}
