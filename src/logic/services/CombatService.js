import ComponentService from './ComponentService.js';

export default {
    weapons(owner) {
        return ComponentService.getComponentsOfType(owner.components, 'WEAPON');
    },
    minAimPoint(owner) {
        return this.weapons(owner)
            .map(w => (w.arcStart === undefined ? 0 : w.arcStart))
            .reduce((prev, curr) => Math.min(prev, curr), 0);
    },
    maxAimPoint(owner) {
        return this.weapons(owner)
            .map(w => (w.arcEnd === undefined ? 0 : w.arcEnd))
            .reduce((prev, curr) => Math.max(prev, curr), 0);
    },
    weaponRange(owner) {
        return this.weapons(owner)
            .map(w => (w.range === undefined ? 0 : w.range))
            .reduce((prev, curr) => Math.max(prev, curr), 0);
    },
    /**
     * Responds to collisions by applying damage as needed to the entities in question
     * @param {MobileEntity} collidingEntity
     * @param {SectorEntity} targetEntity
     */
    applyCollisionDamage(collidingEntity, targetEntity) {
        // TODO: Right now this assumes the two objects have the same mass
        const sourceThrust = collidingEntity.thrust;

        const distributedThrust = sourceThrust / 2;
        const multiplier = 3.5;

        collidingEntity.damage(Math.round(distributedThrust * multiplier));
        targetEntity.damage(Math.round(distributedThrust * multiplier));
    },
};
