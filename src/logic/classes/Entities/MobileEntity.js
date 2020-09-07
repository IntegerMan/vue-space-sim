import SectorEntity from '@/logic/classes/Entities/SectorEntity';
import VectorHelper from '@/logic/helpers/VectorHelper';
import CombatService from '@/logic/services/CombatService';

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
        this.thrust = 0;
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
        if (this.pos === newPos) {
            return;
        }
        const points = VectorHelper.generatePointArray(this.pos, newPos, 4);
        for (const pos of points) {
            // Check this point for any conflicts
            for (const contact of context.otherContacts) {
                if (VectorHelper.checkCollision(pos, this.size, contact.pos, contact.size)) {
                    this.collidedWith(contact);
                    return;
                }
            }

            // Actually move
            this.pos = pos;
        }
    }

    isMobile() {
        return true;
    }

    /**
     * Responds to a collision between two entities
     * @param {SectorEntity} otherEntity the entity this entity collided into
     */
    collidedWith(otherEntity) {
        console.log(`${this.displayName()} collided with ${otherEntity.displayName()}`);
        CombatService.applyCollisionDamage(this, otherEntity);
    }
}
