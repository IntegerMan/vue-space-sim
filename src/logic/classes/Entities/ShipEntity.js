import VectorHelper from '@/logic/helpers/VectorHelper';
import ComponentService from '@/logic/services/ComponentService';
import MobileEntity from '@/logic/classes/Entities/MobileEntity';

/**
 *  Represents a mobile object in the game world in a specific sector
 */
export default class ShipEntity extends MobileEntity {
    /**
     * Creates a new entity
     * @param {Point} pos the point in the game world
     * @param {Number} classification
     */
    constructor(pos, classification) {
        super(pos, classification);

        this.throttle = 25;
        this.desiredThrottle = this.throttle;

        this.hullPart = null;
        this.enginePart = null;
        this.thrusterPart = null;
        this.jumpDrivePart = null;
        this.weaponPart = null;
        this.sensorsPart = null;
    }

    getAllComponents() {
        return [
            this.hullPart,
            this.enginePart,
            this.thrusterPart,
            this.jumpDrivePart,
            this.weaponPart,
            this.sensorsPart,
        ].filter(c => c);
    }

    /**
     * Simulates an individual contact and returns the new version of that contact
     * @param {SimContext} context the simulation context for this contact
     * @returns {SimContext} the updated context
     */
    simulate(context) {
        this.adjustSystems();
        this.updatePosition(context);
        this.launchProjectiles(context);

        return context;
    }

    adjustHeading() {
        this.heading = VectorHelper.steerTowardsHeading(
            this.heading,
            this.desiredHeading,
            this.thrusterPart.effectiveTurnSpeed()
        );
    }
    adjustThrottle() {
        this.throttle = VectorHelper.moveTowardsSetThrottle(
            this.throttle,
            this.desiredThrottle,
            ComponentService.getLargestValue(
                ComponentService.getActiveComponentsOfType(this.components, 'ENGINE'),
                e => e.maxAcceleration
            )
        );
    }
    adjustThrust() {
        // Figure out thrust for things that have engines
        const engines = ComponentService.getComponentsOfType(this.components, 'ENGINE');
        if (engines.length) {
            const throttlePercent = this.throttle / 100;
            const bestThrust = ComponentService.getLargestValue(
                engines.filter(e => e.isOn),
                e => e.maxThrust
            );
            this.thrust = throttlePercent * bestThrust;
        }
    }

    adjustSystems() {
        // Adjust steering for AI Ships with nav targets
        if (this.navTarget) {
            this.desiredHeading = VectorHelper.getHeadingInDegrees(this.pos, this.navTarget);
        }

        this.adjustHeading();
        this.adjustThrottle();
        this.adjustThrust();
    }

    updateNavTarget() {
        if (this.navTarget && this.pos.calculateDistance(this.navTarget) <= 5) {
            this.navTarget = undefined;
        }
    }

    updatePosition(context) {
        // Advance the ship given the current position, thrust, and heading
        let newPos = VectorHelper.calculateNewPosition(this.pos, this.heading, this.thrust);
        this.moveObject(newPos, context);

        this.updateNavTarget();

        // If we don't have a navigational target anymore, we must have arrived at our destination. Land / jump.
        if (!this.navTarget) {
            context.contact = null;
            this.isDead = true;
        }
    }

    launchProjectiles() {}

    damage(amount) {
        this.hullPart.health -= amount;

        this.isDead = this.hullPart.health <= 0;
    }
}
