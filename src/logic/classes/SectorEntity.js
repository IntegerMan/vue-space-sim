import ContactType from '@/logic/enums/ContactType';

/**
 *  Represents a object in the game world in a specific sector
 */
export default class SectorEntity {
    /**
     * Creates a new entity
     * @param {Point} pos the point in the game world
     * @param classification
     */
    constructor(pos, classification) {
        this.pos = pos;
        this.classification = classification;

        this.id = -1;
        this.code = '';
        this.name = 'TODO';
        this.isPlayer = false;
        this.contactType = ContactType.UNCLASSIFIED;
        this.size = 15;
        this.heading = 0;
        this.desiredHeading = 0;
        this.throttle = 0;
        this.desiredThrottle = 0;
    }
}
