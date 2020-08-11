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

    steerTowardsHeading(current, target, maxTurn) {
        if (current === target) return current;
        let distanceRight, distanceLeft;

        if (current < target) {
            distanceLeft = current + 360 - target;
            distanceRight = target - current;
        } else {
            distanceLeft = current - target;
            distanceRight = 360 - current + target;
        }

        if (distanceLeft < distanceRight) {
            if (distanceLeft <= maxTurn) {
                current = target;
            } else {
                current -= maxTurn;
            }
        } else {
            if (distanceRight <= maxTurn) {
                current = target;
            } else {
                current += maxTurn;
            }
        }

        return this.clampDegrees(current);
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
