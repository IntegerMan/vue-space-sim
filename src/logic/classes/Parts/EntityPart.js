export default class EntityPart {
    constructor(componentData) {
        this.partId = componentData.id;
        this.type = componentData.type;

        this.health = componentData.maxHealth;
        this.maxHealth = componentData.maxHealth;
        this.isOn = componentData.isOn;
    }
}
