import Classification from '../enums/Classification.js';
import ContactType from '../enums/ContactType.js';
import ShipService from './ShipService.js';

export default {
    assignIds(contacts, startId = 1) {
        contacts.forEach(c => (c.id = startId++));

        return startId;
    },

    // eslint-disable-next-line no-unused-vars
    buildInitialContacts(sector) {
        const contacts = [
            ShipService.createShip(
                s => {
                    s.isPlayer = true;
                    s.name = 'Concordia';
                    s.code = 'CVS-65';
                },
                Classification.FRIENDLY,
                ContactType.CARRIER,
                { x: 880, y: 1000 }
            ),
            ShipService.createJumpPoint(
                c => {
                    c.name = 'Jump Point';
                },
                {
                    x: 650,
                    y: 200,
                }
            ),
            ShipService.createJumpPoint(
                c => {
                    c.name = 'Jump Point';
                },
                {
                    x: 200,
                    y: 1600,
                }
            ),
            ShipService.createJumpPoint(
                c => {
                    c.name = 'Jump Point';
                },
                {
                    x: 1800,
                    y: 900,
                }
            ),
            ShipService.createStation(
                c => {
                    c.name = 'Colony';
                },
                Classification.CIVILIAN,
                {
                    x: 1000,
                    y: 1000,
                }
            ),
            ShipService.createStation(
                c => {
                    c.name = 'Mining Base';
                },
                Classification.CIVILIAN,
                {
                    x: 1350,
                    y: 1100,
                }
            ),
            ShipService.createStation(
                c => {
                    c.name = 'Manufacturing';
                },
                Classification.CIVILIAN,
                {
                    x: 550,
                    y: 1700,
                }
            ),
            ShipService.createStation(
                c => {
                    c.name = 'Pirate Base';
                },
                Classification.HOSTILE,
                {
                    x: 1750,
                    y: 250,
                }
            ),
        ];

        this.assignIds(contacts);

        return contacts;
    },
};
