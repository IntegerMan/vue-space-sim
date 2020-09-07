import EntityPart from '@/logic/classes/Parts/EntityPart';

function buildEmptyData() {
    return {
        id: 'EMPTY',
        type: 'CPU',
        name: 'Empty',
        maxHealth: 0,
        isOn: undefined,
    };
}

export default class ComputerPart extends EntityPart {
    constructor(componentData) {
        if (!componentData) {
            componentData = buildEmptyData();
        }

        super(componentData);
    }
}
