import EntityPart from '@/logic/classes/Parts/EntityPart';

function buildEmptyData() {
    return {
        id: 'EMPTY',
        type: 'WEAPON',
        name: 'Empty',
        maxHealth: 0,
        isOn: undefined,
        projectileInfo: {
            maxTicks: 1,
            size: 1,
            thrust: 0,
        },
    };
}

export default class WeaponPart extends EntityPart {
    constructor(componentData) {
        if (!componentData) {
            componentData = buildEmptyData();
        }

        super(componentData);

        this.arcStart = componentData.arcStart || 0;
        this.arcEnd = componentData.arcEnd || 0;
        this.loadTime = componentData.loadTime || 0;
        this.range = componentData.range || 0;

        // Read Projectile information
        this.projectileLifeTime = componentData.projectileInfo.maxTicks || 0;
        this.projectileSize = componentData.projectileInfo.size || 0;
        this.projectileThrust = componentData.projectileInfo.thrust || 0;
        this.projectileName = componentData.projectileInfo.name || '';
    }
}
