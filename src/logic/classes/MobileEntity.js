import VectorHelper from '@/logic/helpers/VectorHelper';
import ComponentService from '@/logic/services/ComponentService';
import ShipService from '@/logic/services/ShipService';
import SectorEntity from '@/logic/classes/SectorEntity';

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
        const contact = context.contact;

        if (!contact) return context;

        if (contact.ticksLeft !== undefined) {
            if (--contact.ticksLeft <= 0) {
                console.debug('Despawning projectile', context.contact);
                context.contact = null;
                return context;
            }
        }

        contact.heading = VectorHelper.steerTowardsHeading(
            context.contact.heading,
            context.contact.desiredHeading,
            ComponentService.getLargestValue(
                ComponentService.getActiveComponentsOfType(context.contact.components, 'RCS'),
                r => r.turnSpeed
            )
        );

        contact.throttle = VectorHelper.moveTowardsSetThrottle(
            context.contact.throttle,
            context.contact.desiredThrottle,
            ComponentService.getLargestValue(
                ComponentService.getActiveComponentsOfType(context.contact.components, 'ENGINE'),
                e => e.maxAcceleration
            )
        );

        return context;
    }

    updatePosition(context) {
        // Figure out thrust for things that have engines
        const engines = ComponentService.getComponentsOfType(this.components, 'ENGINE');
        if (engines.length || this.thrust === undefined) {
            const throttlePercent = this.throttle / 100;
            const bestThrust = ComponentService.getLargestValue(
                engines.filter(e => e.isOn),
                e => e.maxThrust
            );
            this.thrust = throttlePercent * bestThrust;
        }

        // Advance the ship given the current position, thrust, and heading
        let newPos = VectorHelper.calculateNewPosition(this.pos, this.heading, this.thrust);

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
            context.contact.pos = newPos;
        }

        // Check to see if we've reached our current nav target
        if (this.navTarget && this.pos.calculateDistance(this.navTarget) <= 5) {
            this.navTarget = undefined;
        }

        // If we don't have a navigational target anymore, we must have arrived at our destination. Land / jump.
        if (!this.isPlayer && !this.navTarget) {
            context.contact = null;
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
