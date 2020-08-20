import ContactType from '../enums/ContactType';
import Classification from '../enums/Classification';
import VectorHelper from '../helpers/VectorHelper';
import _ from 'lodash';

export default {
    createContact(configureFunc, classification, pos) {
        const contact = {
            id: -1,
            code: '',
            name: 'TODO',
            isPlayer: false,
            classification: classification,
            contactType: ContactType.UNCLASSIFIED,
            size: 15,
            heading: 0,
            desiredHeading: 0,
            throttle: 0,
            desiredThrottle: 0,
            pos: pos,
        };

        if (configureFunc) {
            configureFunc(contact);
        }

        return contact;
    },
    configureStatic(obj) {
        obj.code = obj.code || '';
        obj.heading = 0;
        obj.desiredHeading = 0;
        obj.throttle = 0;
        obj.desiredThrottle = 0;
    },
    configureStation(obj) {
        this.configureStatic(obj);

        obj.type = 'STATION';
        obj.contactType = ContactType.STATION;
        obj.size = this.parseTier(obj);
        obj.classification = this.parseOwner(obj);
    },
    configureJumpPoint(obj) {
        this.configureStatic(obj);

        obj.name = obj.name || 'Jump Point';
        obj.type = 'JUMP_POINT';
        obj.contactType = ContactType.JUMP_POINT;
        obj.size = 25;
        obj.classification = Classification.NEUTRAL;
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

    createShip(configureFunc, classification, shipType, pos) {
        const shipFunc = contact => {
            contact.type = 'SHIP';
            contact.contactType = shipType;
            contact.throttle = 25;
            contact.desiredThrottle = contact.throttle;
            contact.navTarget = undefined;
            contact.sensorRange = 350; // TODO: Grab from ShipDefinitionService

            if (configureFunc) {
                configureFunc(contact);
            }
        };

        return this.createContact(shipFunc, classification, pos);
    },
    createPlayer(pos) {
        return this.createShip(
            s => {
                s.isPlayer = true;
                s.name = 'Concordia';
                s.code = 'CVS-65';
                s.id = 'PLAYER';
            },
            Classification.FRIENDLY,
            ContactType.CARRIER,
            pos
        );
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
    /**
     * Calculates contacts that should be visible given the scanning ship or station's sensors
     * @param {Object} sector the current sector
     * @param {Object} scanningObject the object doing the scanning
     * @returns {Object[]} all visible objects
     */
    calculateVisibleContacts(sector, scanningObject) {
        const centerPos = scanningObject.pos;
        const range = scanningObject.sensorRange;

        const entities = _.concat(sector.ships, ...sector.jumpPoints, ...sector.stations);

        return entities.filter(
            c => !this.isMobile(c) || VectorHelper.calculateDistance(centerPos, c.pos) <= range
        );
    },
};
