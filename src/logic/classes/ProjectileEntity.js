import VectorHelper from '@/logic/helpers/VectorHelper';
import MobileEntity from '@/logic/classes/MobileEntity';

/**
 *  Represents a mobile object in the game world in a specific sector
 */
export default class ProjectileEntity extends MobileEntity {
    /**
     * Creates a new entity
     * @param {Point} pos the point in the game world
     * @param {Number} classification
     * @param {any} projectileInfo
     */
    constructor(pos, classification, projectileInfo) {
        super(pos, classification);

        this.size = projectileInfo.size;
        this.ticksLeft = projectileInfo.maxTicks;
        this.thrust = projectileInfo.thrust;
        this.name = projectileInfo.name || 'v';
    }

    adjustSystems(context) {
        if (this.ticksLeft !== undefined) {
            if (--this.ticksLeft <= 0) {
                console.debug('Despawning projectile', context.contact);
                context.contact = null;
                this.isDead = true;
                return context;
            }
        }

        return context;
    }

    updatePosition(context) {
        // Advance the ship given the current position, thrust, and heading
        let newPos = VectorHelper.calculateNewPosition(this.pos, this.heading, this.thrust);

        this.moveObject(newPos, context);

        // Return a modified version of the ship
        return context;
    }
}
