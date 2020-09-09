import Ships from '../../assets/data/Ships.json';
import ComponentService from './ComponentService.js';
import HullPart from '@/logic/classes/Parts/HullPart';
import ThrusterPart from '@/logic/classes/Parts/ThrusterPart';
import EnginePart from '@/logic/classes/Parts/EnginePart';
import SensorPart from '@/logic/classes/Parts/SensorPart';
import WeaponPart from '@/logic/classes/Parts/WeaponPart';
import ComputerPart from '@/logic/classes/Parts/ComputerPart';
import JumpDrivePart from '@/logic/classes/Parts/JumpDrivePart';
import BatteryPart from '@/logic/classes/Parts/BatteryPart';
import GeneratorPart from '@/logic/classes/Parts/GeneratorPart';

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
        entity.weaponPart = new WeaponPart(ComponentService.findComponentTemplate(template.weapons));
        entity.computerPart = new ComputerPart(ComponentService.findComponentTemplate(template.cpu));
        entity.jumpDrivePart = new JumpDrivePart(ComponentService.findComponentTemplate(template.jump));
        entity.batteryPart = new BatteryPart(ComponentService.findComponentTemplate(template.battery));
        entity.generatorPart = new GeneratorPart(ComponentService.findComponentTemplate(template.power));

        console.debug(`Built ship ${entity.contactType}`, entity);

        return entity;
    },
};
