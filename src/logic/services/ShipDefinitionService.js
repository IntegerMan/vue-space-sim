import Ships from '../../assets/data/Ships.json';

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

        return {
            ...template,
            components: template.components.map(c => this.initializeComponent({ ...c })),
        };
    },
    initializeComponent(component) {
        component.health = component.maxHealth;

        if (component.children) {
            component.children = component.children.map(c => this.initializeComponent({ ...c }));
        }

        return component;
    },
};
