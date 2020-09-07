import EntityPart from '@/logic/classes/Parts/EntityPart';

export default class ThrusterPart extends EntityPart {
    constructor(componentData) {
        if (!componentData) throw 'No component data provided for thruster';

        super(componentData);

        this.turnSpeed = componentData.turnSpeed;
    }

    /**
     * Gets the effective turn speed of the component. If the component is off, this will be zero.
     * @returns {Number}
     */
    effectiveTurnSpeed() {
        return this.isOn ? this.turnSpeed : 0;
    }
}
