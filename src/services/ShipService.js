import ContactType from '../enums/ContactType';
import Classification from '../enums/Classification';

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

        obj.contactType = ContactType.STATION;
        obj.size = this.parseTier(obj);
        obj.classification = this.parseOwner(obj);
    },
    configureJumpPoint(obj) {
        this.configureStatic(obj);

        obj.name = obj.name || 'Jump Point';
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
            contact.contactType = shipType;
            contact.throttle = 25;
            contact.desiredThrottle = 25;

            if (configureFunc) {
                configureFunc(contact);
            }
        };

        return this.createContact(shipFunc, classification, pos);
    },
};
