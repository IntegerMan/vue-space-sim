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
        this.isPlayer = false;
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
}
