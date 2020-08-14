import Classification from '../enums/Classification.js';
import ContactType from '../enums/ContactType.js';
import Sector from '../enums/Sector';
import ShipService from './ShipService.js';
import SectorData from '../data/Sectors.json';
import _ from 'lodash';

export default {
    assignIds(contacts, startId = 1) {
        contacts.forEach(c => (c.id = startId++));

        return startId;
    },

    buildSectors() {
        return [this.loadSector(Sector.START_SECTOR)];
    },

    // eslint-disable-next-line no-unused-vars
    loadSector(sectorId) {
        const sector = SectorData.find(s => s.id === sectorId);
        if (!sector) {
            console.warn('Could not find sector', sectorId, SectorData);
        }

        sector.stations.forEach(s => ShipService.configureStation(s));
        sector.jumpPoints.forEach(j => ShipService.configureJumpPoint(j));

        return sector;
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
