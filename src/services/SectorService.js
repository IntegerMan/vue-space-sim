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
                Classification.FRIENDLY,
                ContactType.CARRIER,
                { x: 900, y: 1000 },
                s => {
                    s.isPlayer = true;
                    s.name = 'Concordia';
                    s.code = 'CVS-65';
                }
            ),
            ShipService.createShip(
                Classification.NEUTRAL,
                ContactType.JUMP_POINT,
                {
                    x: 650,
                    y: 200,
                },
                c => {
                    c.name = 'Jump Point';
                }
            ),
            ShipService.createShip(
                Classification.NEUTRAL,
                ContactType.JUMP_POINT,
                {
                    x: 200,
                    y: 1600,
                },
                c => {
                    c.name = 'Jump Point';
                }
            ),
            ShipService.createShip(
                Classification.NEUTRAL,
                ContactType.JUMP_POINT,
                {
                    x: 1800,
                    y: 900,
                },
                c => {
                    c.name = 'Jump Point';
                }
            ),
            ShipService.createShip(
                Classification.CIVILIAN,
                ContactType.STATION,
                {
                    x: 1000,
                    y: 1000,
                },
                c => {
                    c.name = 'Colony';
                }
            ),
            ShipService.createShip(
                Classification.CIVILIAN,
                ContactType.STATION,
                {
                    x: 1350,
                    y: 1100,
                },
                c => {
                    c.name = 'Mining Base';
                }
            ),
            ShipService.createShip(
                Classification.CIVILIAN,
                ContactType.STATION,
                {
                    x: 550,
                    y: 1700,
                },
                c => {
                    c.name = 'Manufacturing';
                }
            ),
            ShipService.createShip(
                Classification.HOSTILE,
                ContactType.STATION,
                {
                    x: 1750,
                    y: 250,
                },
                c => {
                    c.name = 'Pirate Base';
                }
            ),
        ];

        this.assignIds(contacts);

        return contacts;
    },
};
