import EntityPart from '@/logic/classes/Parts/EntityPart';

export default class EnginePart extends EntityPart {

    constructor(componentData) {
        if (!componentData) throw 'No component data provided for engine';

        super(componentData);

        this.maxAcceleration = componentData.maxAcceleration || 0;
        this.maxThrust = componentData.maxThrust || 0;
    }

    /**
     * Gets the effective maximum thrust of the component. If the component is off, this will be zero.
     * @returns {Number}
     */
    effectiveMaxThrust() {
        return this.isOn ? this.maxThrust : 0;
    }

    /**
     * Gets the effective maximum acceleration of the component. If the component is off, this will be zero.
     * @returns {Number}
     */
    effectiveMaxAcceleration() {
        return this.isOn ? this.maxAcceleration : 0;
    }
}
