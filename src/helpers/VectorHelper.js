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
        return (Math.atan2(targetPos.y - originPos.y, targetPos.x - originPos.x) * 180) / Math.PI;
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

    calculatePercentMagnitude(value, min, max) {
        const range = max - min;
        const pct = value / 100.0;
        const desired = range * pct;

        return Math.max(min, desired);
    },
};
