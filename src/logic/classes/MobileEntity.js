import SectorEntity from '@/logic/classes/SectorEntity';
import VectorHelper from '@/logic/helpers/VectorHelper';

/**
 *  Represents a mobile object in the game world in a specific sector
 */
export default class MobileEntity extends SectorEntity {
    /**
     * Creates a new entity
     * @param {Point} pos the point in the game world
     * @param {Number} classification
     */
    constructor(pos, classification) {
        super(pos, classification);

        this.heading = 0;
        this.desiredHeading = 0;
        this.throttle = 0;
        this.desiredThrottle = 0;
    }

    /**
     * Simulates an individual contact and returns the new version of that contact
     * @param {SimContext} context the simulation context for this contact
     * @returns {SimContext} the updated context
     */
    simulate(context) {
        context = this.adjustSystems(context);
        context = this.updatePosition(context);
        return context;
    }

    adjustSystems(context) {
        return context;
    }

    updatePosition(context) {
        return context;
    }

    moveObject(newPos, context) {
        if (this.pos !== newPos) {
            // Generate intermediate points
            const points = VectorHelper.generatePointArray(this.pos, newPos, 4);

            let collided = false;
            for (const pos of points) {
                for (const c of context.otherContacts) {
                    if (VectorHelper.checkCollision(pos, this.size, c.pos, c.size)) {
                        console.log('Collision detected', this, c);
                        // TODO: This should probably damage both entities
                        collided = true;
                        break;
                    }
                }

                if (collided) {
                    break;
                } else {
                    newPos = pos;
                }
            }

            // Actually move
            this.pos = newPos;
        }
    }
}
