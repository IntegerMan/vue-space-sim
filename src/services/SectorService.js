import Classification from '../enums/Classification.js';
import ContactType from '../enums/ContactType.js';
import Sector from '../enums/Sector';
import ShipService from './ShipService.js';
import _ from 'lodash';

export default {
    assignIds(contacts, startId = 1) {
        contacts.forEach(c => (c.id = startId++));

        return startId;
    },

    buildSectors() {
        return [this.loadSector(Sector.START_SECTOR)];
    },

    loadSector(sectorId) {
        // TODO: This should really live in a JSON file
        return {
            name: 'Starting Sector',
            id: sectorId,
            size: { x: 2000, y: 2000 },
            stations: [
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
            ],
            jumpPoints: [
                ShipService.createJumpPoint({ x: 650, y: 200 }),
                ShipService.createJumpPoint({ x: 200, y: 1600 }),
                ShipService.createJumpPoint({ x: 1800, y: 900 }),
            ],
        };
    },

    buildInitialContacts(sector) {
        let contacts = [
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
        ];

        contacts = _.concat(contacts, ...sector.stations, ...sector.jumpPoints);

        this.assignIds(contacts);

        return contacts;
    },
};
