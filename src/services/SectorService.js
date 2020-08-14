import Classification from '../enums/Classification.js';
import ContactType from '../enums/ContactType.js';
import Sector from '../enums/Sector.js';

import SectorData from '../data/Sectors.json';

import ShipService from './ShipService.js';
import RandomService from './RandomService.js';

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
        const sector = SectorData.find(s => s.id === sectorId);
        if (!sector) {
            console.warn('Could not find sector', sectorId, SectorData);
        }

        sector.stations.forEach(s => ShipService.configureStation(s));
        sector.jumpPoints.forEach(j => ShipService.configureJumpPoint(j));

        return sector;
    },

    buildInitialContacts(sector, player) {
        const initialNPCs = [];

        for (let i = 0; i < 5; i++) {
            // TODO: Base the count on sector density
            // TODO: Figure out an origin
            // TODO: Figure out a destination
            const pos = RandomService.randomPos(sector); // TODO: Spawn near a station or jump point, or halfway between the two
            const ship = ShipService.createShip(
                s => {
                    s.heading = RandomService.randomDegree();
                    s.desiredHeading = s.heading;
                    s.name = 'Scout'; // TODO: should have a valid name
                },
                RandomService.randomEnum(Classification), // TODO: Should have an appropriate classification
                RandomService.randomEnum(ContactType), // TODO: Should have an appropriate contact type
                // TODO: Should have an appropriate mission registered
                pos
            );
            initialNPCs.push(ship);
        }

        const contacts = _.concat(sector.stations, ...sector.jumpPoints, player, ...initialNPCs);

        this.assignIds(contacts);

        return contacts;
    },
};
