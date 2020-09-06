import ContactType from '../enums/ContactType';
import Classification from '../enums/Classification';
import _ from 'lodash';
import ShipDefinitionService from './ShipDefinitionService';
import ComponentService from './ComponentService';
import RandomService from './RandomService';
import MobileEntity from '@/logic/classes/MobileEntity';

export default {
    createShip(configureFunc, classification, shipType, pos) {
        const contact = ShipDefinitionService.buildFromTemplate(shipType, pos, classification);

        contact.id = -1;
        contact.isPlayer = false;
        contact.type = 'SHIP';
        contact.code = '';
        contact.contactType = shipType;
        contact.throttle = 25;
        contact.desiredThrottle = contact.throttle;
        contact.navTarget = undefined;
        contact.heading = 0;
        contact.desiredHeading = 0;

        if (configureFunc) {
            configureFunc(contact);
        }

        return contact;
    },
    createPlayer(pos) {
        return this.createShip(
            s => {
                s.isPlayer = true;
                s.code = 'CVS-65';
                s.id = 'PLAYER';
            },
            Classification.FRIENDLY,
            'CARRIER',
            pos
        );
    },
    createProjectile(owner, pos, heading, projectileInfo) {
        const proj = new MobileEntity(pos, owner.classification);

        proj.contactType = ContactType.MISSILE;
        proj.owner = owner.id;
        proj.heading = heading;
        proj.desiredHeading = heading;
        proj.throttle = 100;
        proj.id = 'proj-' + owner.id + '-' + RandomService.randomInt(0, 9999);
        proj.desiredThrottle = 100;
        proj.size = projectileInfo.size;
        proj.ticksLeft = projectileInfo.maxTicks;
        proj.thrust = projectileInfo.thrust;
        proj.name = projectileInfo.name || 'v';
        proj.navTarget = { x: -900, y: -900 }; // TODO: Blatant hack to avoid despawning

        return proj;
    },

    parseOwner(obj) {
        switch (obj.owner) {
            case 'CIVILIAN':
                return Classification.CIVILIAN;
            case 'PIRATE':
                return Classification.HOSTILE;
            default:
                console.warn('Unknown owner', obj);
                return Classification.UNKNOWN;
        }
    },

    parseTier(obj) {
        switch (obj.tier) {
            case 'LARGE':
                return 60;
            case 'MEDIUM':
                return 45;
            case 'SMALL':
                return 30;
            default:
                console.warn('Unknown size', obj);
                return 30;
        }
    },
    /**
     * Determines whether or not the specified contact is expected to move about the map
     * @param {Object} contact the contact to evaluate
     * @returns {Boolean} whether or not the contact should move around the map
     */
    isMobile(contact) {
        switch (contact.type) {
            case 'JUMP_POINT':
            case 'STATION':
            case 'HAZARD':
                return false;
            default:
                return true;
        }
    },
    calculateSensorRange(scanningObject) {
        return ComponentService.getLargestValue(
            ComponentService.getActiveComponentsOfType(scanningObject.components, 'SENSORS'),
            c => c.range
        );
    },
    /**
     * Calculates contacts that should be visible given the scanning ship or station's sensors
     * @param {Object} sector the current sector
     * @param {SectorEntity} scanningObject the object doing the scanning
     * @returns {Object[]} all visible objects
     */
    calculateVisibleContacts(sector, scanningObject) {
        const centerPos = scanningObject.pos;
        const range = this.calculateSensorRange(scanningObject);

        const entities = _.concat(sector.ships, ...sector.fixedEntities);

        return entities.filter(
            c => !this.isMobile(c) || c.isPlayer || centerPos.calculateDistance(c.pos) <= range
        );
    },
};
