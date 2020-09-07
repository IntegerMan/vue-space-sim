import EntityPart from '@/logic/classes/Parts/EntityPart';

export default class SensorPart extends EntityPart {
    constructor(componentData) {
        if (!componentData) throw 'No component data provided for sensor';

        super(componentData);

        this.range = componentData.range || 0;
    }

    /**
     * Gets the effective range of the component. If the component is off, this will be zero.
     * @returns {Number}
     */
    effectiveRange() {
        return this.isOn ? this.range : 0;
    }
}
