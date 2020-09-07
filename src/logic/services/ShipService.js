import ContactType from '../enums/ContactType';
import Classification from '../enums/Classification';
import _ from 'lodash';
import RandomService from './RandomService';
import ProjectileEntity from '@/logic/classes/Entities/ProjectileEntity';

export default {
    createProjectile(owner, pos, heading, projectileInfo) {
        const proj = new ProjectileEntity(pos, owner.classification, projectileInfo);

        proj.contactType = ContactType.MISSILE;
        proj.owner = owner.id;
        proj.heading = heading;
        proj.desiredHeading = heading;
        proj.throttle = 100;
        proj.id = 'proj-' + owner.id + '-' + RandomService.randomInt(0, 9999);
        proj.desiredThrottle = 100;
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
     * Calculates contacts that should be visible given the scanning ship or station's sensors
     * @param {Sector} sector the current sector
     * @param {ShipEntity} scanningObject the object doing the scanning
     * @returns {Object[]} all visible objects
     */
    calculateVisibleContacts(sector, scanningObject) {
        const centerPos = scanningObject.pos;
        const range = scanningObject.sensorsPart.effectiveRange();

        const entities = _.concat(sector.ships, ...sector.fixedEntities);

        return entities.filter(c => c.isAlwaysKnown() || c.isPlayer() || centerPos.calculateDistance(c.pos) <= range);
    },
};
