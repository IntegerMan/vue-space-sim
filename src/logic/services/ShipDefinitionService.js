import Ships from '../../assets/data/Ships.json';
import ComponentService from './ComponentService.js';
import MobileEntity from '@/logic/classes/MobileEntity';

export default {
    /**
     * Finds and returns a ship template with a specified id
     *
     * @param {String} shipId the unique identifier for the ship template
     * @param {Point} pos the initial position of the ship
     * @param {any} classification the classification of the ship
     * @returns {MobileEntity|null} the newly created ship
     */
    buildFromTemplate(shipId, pos, classification) {
        const template = Ships.find(s => s.id === shipId);
        if (!template) {
            console.error(`Could not find ship template ${shipId}`);
            return null;
        }

        const ship = new MobileEntity(pos, classification);
        ship.id = template.id;
        ship.name = template.name;
        ship.size = template.size;
        ship.components = template.components.map(c => this.initializeComponent({ ...c }));

        console.debug(`Built ship ${shipId}`, ship);

        return ship;
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
