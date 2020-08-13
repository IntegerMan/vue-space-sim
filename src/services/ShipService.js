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
            thrust: 8,
            desiredThrottle: 8,
            pos: pos,
        };

        if (configureFunc) {
            configureFunc(contact);
        }

        return contact;
    },

    createStation(configureFunc, classification, pos) {
        const stationFunc = contact => {
            contact.thrust = 0;
            contact.desiredThrottle = 0;
            contact.size = 45;
            contact.contactType = ContactType.STATION;

            if (configureFunc) {
                configureFunc(contact);
            }
        };

        return this.createContact(stationFunc, classification, pos);
    },

    createJumpPoint(configureFunc, pos) {
        const func = contact => {
            contact.thrust = 0;
            contact.desiredThrottle = 0;
            contact.size = 25;
            contact.contactType = ContactType.JUMP_POINT;

            if (configureFunc) {
                configureFunc(contact);
            }
        };

        return this.createContact(func, Classification.NEUTRAL, pos);
    },

    createShip(configureFunc, classification, shipType, pos) {
        const shipFunc = contact => {
            contact.contactType = shipType;

            if (configureFunc) {
                configureFunc(contact);
            }
        };

        return this.createContact(shipFunc, classification, pos);
    },
};
