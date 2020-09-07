import Ships from '../../assets/data/Ships.json';
import ComponentService from './ComponentService.js';
import HullPart from '@/logic/classes/Parts/HullPart';
import ThrusterPart from '@/logic/classes/Parts/ThrusterPart';
import EnginePart from '@/logic/classes/Parts/EnginePart';
import SensorPart from '@/logic/classes/Parts/SensorPart';

export default {
    /**
     * Finds and returns a ship template with a specified id
     *
     * @param {ShipEntity} entity the ship to configure
     * @param {String} shipId the unique identifier for the ship template
     * @returns {ShipEntity} the ship
     */
    buildFromTemplate(entity) {
        const template = Ships.find(s => s.id === entity.contactType);
        if (!template) {
            console.error(`Could not find ship template ${entity.contactType}`);
            return entity;
        }

        entity.id = template.id;
        entity.name = template.name;
        entity.size = template.size;

        entity.hullPart = new HullPart(ComponentService.findComponentTemplate(template.core));
        entity.thrusterPart = new ThrusterPart(ComponentService.findComponentTemplate(template.thrusters));
        entity.enginePart = new EnginePart(ComponentService.findComponentTemplate(template.engines));
        entity.sensorsPart = new SensorPart(ComponentService.findComponentTemplate(template.sensors));

        console.debug(`Built ship ${entity.contactType}`, entity);

        return entity;
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
