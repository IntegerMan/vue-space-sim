import Point from '@/logic/classes/Point';

export default {
    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    },

    /**
     * Calculates a new position for a given point and returns it
     * @param {Point} pos the point to start with
     * @param {Number} headingInDegrees the current heading
     * @param {Number} amountToMove the distance to displace the point
     * @returns {Point} the new position
     */
    calculateNewPosition(pos, headingInDegrees, amountToMove) {
        const radians = this.degreesToRadians(headingInDegrees);
        const modX = amountToMove * Math.sin(radians);
        const modY = amountToMove * Math.cos(radians);

        return new Point(pos.x + modX, pos.y - modY);
    },

    /**
     * Calculates and returns the angle in degrees from the origin position to the target position
     * @param {Object} originPos the location the calculating entity is in
     * @param {Object} targetPos the location the calculating entity wants to face or avoid
     * @returns {Number} the angle (in degrees) from the originPos to the targetPos
     */
    getHeadingInDegrees(originPos, targetPos) {
        const diffY = targetPos.y - originPos.y;
        const diffX = targetPos.x - originPos.x;
        const atan = Math.atan2(diffY, diffX);
        const rads = atan * 180;
        const degrees = rads / Math.PI;

        return this.clampDegrees(degrees + 90);
    },

    steerTowardsHeading(current, target, maxTurn) {
        if (current === target) return current;

        let distance = this.calculateTurnDistanceInDegrees(current, target);

        if (distance.left < distance.right) {
            if (distance.left <= maxTurn) {
                current = target;
            } else {
                current -= maxTurn;
            }
        } else {
            if (distance.right <= maxTurn) {
                current = target;
            } else {
                current += maxTurn;
            }
        }

        return this.clampDegrees(current);
    },

    moveTowardsSetThrottle(current, target, maxChange) {
        // Do nothing if we're already at our target
        if (current === target) return current;

        // Instantly snap to the target if we're in range
        if (Math.abs(current - target) < maxChange) return target;

        if (current < target) {
            return current + maxChange;
        } else {
            return current - maxChange;
        }
    },

    calculateTurnDistanceInDegrees(current, target) {
        let distanceRight, distanceLeft;

        if (current < target) {
            distanceLeft = current + 360 - target;
            distanceRight = target - current;
        } else {
            distanceLeft = current - target;
            distanceRight = 360 - current + target;
        }

        return { left: distanceLeft, right: distanceRight };
    },

    clampDegrees(value) {
        while (value < 0) {
            value += 360;
        }

        while (value >= 360) {
            value -= 360;
        }
        return value;
    },
    preferNegativeDegrees(value) {
        let newVal = value;

        while (newVal > 180) {
            newVal -= 360;
        }
        while (newVal <= -180) {
            newVal += 360;
        }

        return newVal;
    },
    clampDegreeArc(value, minAcceptable, maxAcceptable) {
        value = this.clampDegrees(value);
        minAcceptable = this.clampDegrees(minAcceptable);
        maxAcceptable = this.clampDegrees(maxAcceptable);

        if (minAcceptable > maxAcceptable) {
            if (value >= minAcceptable) {
                return value;
            }
            if (value <= maxAcceptable) {
                return value;
            }

            const diffMax = value - maxAcceptable;
            const diffMin = minAcceptable - value;

            if (diffMin > diffMax) {
                return maxAcceptable;
            } else {
                return minAcceptable;
            }
        } else {
            return Math.max(minAcceptable, Math.min(maxAcceptable, value));
        }
    },

    calculatePercentMagnitude(value, min, max) {
        const range = max - min;
        const pct = value / 100.0;
        const desired = range * pct;

        return Math.max(min, desired);
    },

    generatePointArray(start, end, segments) {
        const values = [];

        if (segments > 1) {
            const xDiff = end.x - start.x;
            const yDiff = end.y - start.y;

            const xPerSegment = xDiff / segments;
            const yPerSegment = yDiff / segments;

            let xPos = start.x;
            let yPos = start.y;

            for (let i = 0; i < segments - 1; i++) {
                xPos += xPerSegment;
                yPos += yPerSegment;

                values.push(new Point(xPos, yPos));
            }
        }

        values.push(end);

        return values;
    },

    /**
     * Checks for a circle-based collision between two points
     * @param {Point} pos1 the first point to check
     * @param {Number} radius1 the radius of the first point
     * @param {Point} pos2 the second point to check
     * @param {Number} radius2 the radius of the second object
     * @returns {boolean} whether or not there was a collision
     */
    checkCollision(pos1, radius1, pos2, radius2) {
        return pos1.calculateDistance(pos2) < radius1 + radius2;
    },
};
