import ContactType from '@/logic/enums/ContactType';

/**
 *  Represents a object in the game world in a specific sector
 */
export default class SectorEntity {
    /**
     * Creates a new entity
     * @param {Point} pos the point in the game world
     * @param {Number} classification
     */
    constructor(pos, classification) {
        this.pos = pos;
        this.classification = classification;
        this.id = -1;
        this.code = '';
        this.name = 'TODO';
        this.isDead = false;
        this.contactType = ContactType.UNCLASSIFIED;
        this.size = 15;
    }

    /**
     * Simulates an individual contact and returns the new version of that contact
     * @param {SimContext} context the simulation context for this contact
     * @returns {SimContext} the updated context
     */
    simulate(context) {
        return context;
    }

    /**
     * Determines whether or not this object can move
     * @returns {boolean}
     */
    isMobile(){
        return false;
    }

    /**
     * Determines whether or not this object is always known to all entities.
     * This is useful for certain fixed entities such as well-known stations.
     * @returns {boolean}
     */
    isAlwaysKnown() {
        return !this.isMobile();
    }

    /**
     * Determines whether or not this is the player entity
     * @returns {boolean}
     */
    isPlayer() {
        return false;
    }

}
