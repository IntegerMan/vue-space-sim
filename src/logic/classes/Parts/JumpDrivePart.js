import EntityPart from '@/logic/classes/Parts/EntityPart';

function buildEmptyData() {
    return {
        id: 'EMPTY',
        type: 'JUMP_DRIVE',
        name: 'Empty',
        maxHealth: 0,
        isOn: undefined,
    };
}

export default class JumpDrivePart extends EntityPart {
    constructor(componentData) {
        if (!componentData) {
            componentData = buildEmptyData();
        }

        super(componentData);
    }
}
