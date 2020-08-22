import _ from 'lodash';

export default {
    flattenedComponents(components) {
        const parents = components.filter(c => c.children && c.children.length);
        return _.concat(components, ...parents.map(p => this.flattenedComponents(p.children)));
    },
    getComponentsOfType(components, type) {
        const matches = components.filter(c => c.type === type);
        const parents = components.filter(c => c.children && c.children.length);

        return _.concat(matches, ...parents.map(p => this.getComponentsOfType(p.children, type)));
    },
    getLargestValue(components, func) {
        return components.reduce((priorBest, comp) => Math.max(func(comp), priorBest), 0);
    },
};
