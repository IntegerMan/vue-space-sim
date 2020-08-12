import Classification from '../enums/Classification.js';
import ContactType from '../enums/ContactType.js';

export default {
    // eslint-disable-next-line no-unused-vars
    buildInitialContacts(sector) {
        return [
            {
                id: 1,
                code: 'CVN-71',
                name: 'Concordia',
                isPlayer: true,
                classification: Classification.FRIENDLY,
                contactType: ContactType.CARRIER,
                size: 22,
                heading: 35,
                desiredHeading: 0,
                thrust: 8,
                desiredThrottle: 15,
                pos: {
                    x: 500,
                    y: 500,
                },
            },
            {
                id: 2,
                code: 'UNK-8',
                name: 'Unknown',
                classification: Classification.UNKNOWN,
                contactType: ContactType.UNCLASSIFIED,
                size: 7,
                heading: 288,
                desiredHeading: 288,
                thrust: 15,
                desiredThrottle: 15,
                pos: {
                    x: 755,
                    y: 112,
                },
            },
            {
                id: 3,
                code: 'CIV-134',
                name: 'Pathfinder',
                classification: Classification.CIVILIAN,
                contactType: ContactType.LIGHT,
                size: 8,
                heading: 95,
                desiredHeading: 95,
                thrust: 10,
                desiredThrottle: 10,
                pos: {
                    x: 420,
                    y: 881,
                },
            },
            {
                id: 4,
                code: 'V-9',
                name: '',
                classification: Classification.UNCLASSIFIED,
                contactType: ContactType.RADIOLOGICAL,
                size: 8,
                heading: 70,
                desiredHeading: 70,
                thrust: 25,
                desiredThrottle: 25,
                pos: {
                    x: 395,
                    y: 411,
                },
            },
            {
                id: 5,
                code: 'PIR-8',
                name: 'Raider',
                classification: Classification.HOSTILE,
                contactType: ContactType.PIRATE,
                size: 7,
                heading: 310,
                desiredHeading: 310,
                thrust: 20,
                desiredThrottle: 20,
                pos: {
                    x: 920,
                    y: 640,
                },
            },
        ];
    },
};
