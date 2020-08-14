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

    createStation(configureFunc, classification, pos) {
        const stationFunc = contact => {
            contact.size = 45;
            contact.contactType = ContactType.STATION;

            if (configureFunc) {
                configureFunc(contact);
            }
        };

        return this.createContact(stationFunc, classification, pos);
    },

    createJumpPoint(pos, name = 'Jump Point') {
        const func = contact => {
            contact.size = 25;
            contact.contactType = ContactType.JUMP_POINT;
            contact.name = name;
        };

        return this.createContact(func, Classification.NEUTRAL, pos);
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
