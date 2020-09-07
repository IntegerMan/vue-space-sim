import SectorEntity from '@/logic/classes/Entities/SectorEntity';

export default class FixedEntity extends SectorEntity {
    /**
     * Creates a new entity
     * @param {Point} pos the point in the game world
     * @param {Number} classification
     */
    constructor(pos, classification) {
        super(pos, classification);

        this.aiTasks = [];
    }

    isMobile() {
        return false;
    }
}
