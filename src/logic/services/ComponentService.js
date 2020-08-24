import _ from 'lodash';

export default {
    getTitle(component) {
        switch (component.type) {
            case 'CORE':
                return 'Hull Integrity';
            case 'ENGINE':
                return 'Engine';
            case 'RCS':
                return 'RCS Thrusters';
            case 'JUMP_DRIVE':
                return 'Jump Drive';
            case 'CPU':
                return 'Onboard Computer';
            case 'SENSORS':
                return 'Sensor Array';
            default:
                return component.type;
        }
    },
    getSubtitle(component) {
        switch (component.type) {
            case 'CORE':
                return 'The structural integrity of the vessel. When this reaches zero, it will be destroyed.';
            case 'ENGINE':
                return 'Engines provide thrust and allow vessels to move.';
            case 'RCS':
                return 'RCS Thrusters allow ships to turn and face new directions.';
            case 'JUMP_DRIVE':
                return 'Jump Drives allow vessels to make calculated jumps between sectors.';
            case 'CPU':
                return 'Used to accomplish complex tasks like calculating jumps, classifying targets, and long-range combat.';
            case 'SENSORS':
                return 'Determines the maximum range targets can be spotted at as well as the range they become automatically classified.';
            default:
                return component.type;
        }
    },
    flattenedComponents(components) {
        const parents = components.filter(c => c.children && c.children.length);
        return _.concat(components, ...parents.map(p => this.flattenedComponents(p.children)));
    },
    getComponentsOfType(components, type) {
        return this.flattenedComponents(components).filter(c => c.type === type);
    },
    getActiveComponentsOfType(components, type) {
        return this.getComponentsOfType(components, type).filter(c => c.isOn !== false);
    },
    getLargestValue(components, func) {
        return components.reduce((priorBest, comp) => Math.max(func(comp), priorBest), 0);
    },
    findComponentRecursive(components, target) {
        return this.flattenedComponents(components).find(c => c === target);
    },
};