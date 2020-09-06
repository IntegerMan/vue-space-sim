import VectorHelper from '@/logic/helpers/VectorHelper';
import ComponentService from '@/logic/services/ComponentService';
import ShipService from '@/logic/services/ShipService';
import ShipEntity from '@/logic/classes/Entities/ShipEntity';
import Classification from '@/logic/enums/Classification';
import ContactType from '@/logic/enums/ContactType';

/**
 *  Represents a mobile object in the game world in a specific sector
 */
export default class PlayerEntity extends ShipEntity {
    /**
     * Creates a new entity
     * @param {Point} pos the point in the game world
     */
    constructor(pos) {
        super(pos, Classification.FRIENDLY);

        this.isPlayer = true;
        this.code = 'CVS-65';
        this.id = 'PLAYER';
        this.name = 'Concordia';
        this.contactType = ContactType.CARRIER;
    }

    adjustSystems() {
        this.adjustHeading();
        this.adjustThrottle();
        this.adjustThrust();
    }

    updatePosition(context) {
        // Advance the ship given the current position, thrust, and heading
        let newPos = VectorHelper.calculateNewPosition(this.pos, this.heading, this.thrust);
        this.moveObject(newPos, context);

        // Check to see if we've reached our current nav target
        if (this.navTarget && this.pos.calculateDistance(this.navTarget) <= 5) {
            this.navTarget = undefined;
        }
    }

    launchProjectiles(context) {
        const uiState = context.uiState;

        if (uiState.isFiring) {
            const weapons = ComponentService.getActiveComponentsOfType(this.components, 'WEAPON');

            weapons.forEach(w => {
                const heading = VectorHelper.clampDegrees(this.heading + uiState.aimPoint);

                const pos = VectorHelper.calculateNewPosition(
                    this.pos, // TODO: May need to offset this
                    heading,
                    this.size * 3 + w.projectileInfo.size
                );

                context.newContacts.push(
                    ShipService.createProjectile(this, pos, heading, w.projectileInfo)
                );
            });
        }
    }
}
