import Ships from '../../assets/data/Ships.json';
import ComponentService from './ComponentService.js';

export default {
    /**
     * Finds and returns a ship template with a specified id
     *
     * @param {String} shipId the unique identifier for the ship template
     * @returns {Object|null} the newly created ship
     */
    buildFromTemplate(shipId) {
        const template = Ships.find(s => s.id === shipId);
        if (!template) {
            console.error('Could not find ship template ' + shipId);
            return null;
        }

        const constructed = {
            ...template,
            components: template.components.map(c => this.initializeComponent({ ...c })),
        };

        console.debug('Built ship ' + shipId, constructed);

        return constructed;
    },
    initializeComponent(component) {
        const componentTemplate = ComponentService.findComponentTemplate(component.componentId);

        const output = { ...componentTemplate };

        output.health = componentTemplate.maxHealth;

        if (component.children) {
            output.children = component.children.map(c => this.initializeComponent({ ...c }));
        }

        return output;
    },
};
