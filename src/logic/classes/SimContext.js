/**
 * Limited information needed for simulating a specific entity in the game world
 */
export default class SimContext {
    /**
     * Creates a new simulation context
     * @param {SectorEntity} entity the entity doing the simulation
     * @param {SectorEntity[]} entities other entities to be aware of
     * @param {UIState} uiState the user interface state
     */
    constructor(entity, entities, uiState) {
        this.contact = entity;
        this.uiState = uiState;
        this.newContacts = [];
        this.otherContacts = entities.filter(s => s !== entity);
    }
}
