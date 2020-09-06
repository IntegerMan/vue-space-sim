import VectorHelper from '@/logic/helpers/VectorHelper';
import ComponentService from '@/logic/services/ComponentService';
import ShipService from '@/logic/services/ShipService';
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

        this.components = [];
    }

    /**
     * Simulates an individual contact and returns the new version of that contact
     * @param {SimContext} context the simulation context for this contact
     * @returns {SimContext} the updated context
     */
    simulate(context) {
        context = this.adjustSystems(context);
        context = this.updatePosition(context);
        context = this.launchProjectiles(context);
        return context;
    }

    adjustSystems(context) {
        // Adjust steering for AI Ships with nav targets
        if (!this.isPlayer && this.navTarget) {
            this.desiredHeading = VectorHelper.getHeadingInDegrees(this.pos, this.navTarget);
        }

        this.heading = VectorHelper.steerTowardsHeading(
            this.heading,
            this.desiredHeading,
            ComponentService.getLargestValue(
                ComponentService.getActiveComponentsOfType(this.components, 'RCS'),
                r => r.turnSpeed
            )
        );

        this.throttle = VectorHelper.moveTowardsSetThrottle(
            this.throttle,
            this.desiredThrottle,
            ComponentService.getLargestValue(
                ComponentService.getActiveComponentsOfType(this.components, 'ENGINE'),
                e => e.maxAcceleration
            )
        );

        return context;
    }

    updatePosition(context) {
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

        // Advance the ship given the current position, thrust, and heading
        let newPos = VectorHelper.calculateNewPosition(this.pos, this.heading, this.thrust);
        this.moveObject(newPos, context);

        // Check to see if we've reached our current nav target
        if (this.navTarget && this.pos.calculateDistance(this.navTarget) <= 5) {
            this.navTarget = undefined;
        }

        // If we don't have a navigational target anymore, we must have arrived at our destination. Land / jump.
        if (!this.isPlayer && !this.navTarget) {
            context.contact = null;
            this.isDead = true;
        }

        // Return a modified version of the ship
        return context;
    }

    launchProjectiles(context) {
        const uiState = context.uiState;

        if (uiState.isFiring && this.id === 'PLAYER') {
            const weapons = ComponentService.getActiveComponentsOfType(this.components, 'WEAPON');

            weapons.forEach(w => {
                const heading = VectorHelper.clampDegrees(this.heading + uiState.aimPoint);

                const pos = VectorHelper.calculateNewPosition(
                    this.pos, // TODO: May need to offset this
                    heading,
                    this.size * 3 + w.projectileInfo.size
                );

                const proj = ShipService.createProjectile(this, pos, heading, w.projectileInfo);
                context.newContacts.push(proj);
            });
        }

        return context;
    }
}
