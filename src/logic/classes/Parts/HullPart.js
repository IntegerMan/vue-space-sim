import EntityPart from '@/logic/classes/Parts/EntityPart';

export default class HullPart extends EntityPart {
    constructor(componentData) {
        if (!componentData) throw 'No component data provided for hull';

        super(componentData);
    }
}
