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

    /**
     * Calculates and returns the distance between two points
     *
     * @param {Object} pos1 the first point
     * @param {Object} pos2 the second point
     * @returns {Number} the distance between the two points
     */
    calculateDistance(pos1, pos2) {
        // Pythagorean Theorum: a^2 + b^2 = c^2. Solving for c.
        return Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
    },

    translateRelativeToPos(contact, pos, viewPortSize) {
        return {
            ...contact,
            x: contact.pos.x - pos.x + viewPortSize.x / 2,
            y: contact.pos.y - pos.y + viewPortSize.y / 2,
        };
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
};
