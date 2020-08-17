import Classification from '../enums/Classification.js';
import ContactType from '../enums/ContactType.js';
import Sector from '../enums/Sector.js';
import VectorHelper from '../helpers/VectorHelper.js';

import SectorData from '../assets/data/Sectors.json';

import ShipService from './ShipService.js';
import RandomService from './RandomService.js';

import _ from 'lodash';

export default {
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
    /**
     * Gathers all potential AI mission tasks in the sector and returns them in a single array
     *
     * @param {Object} sector the sector that all tasks should be gathered from
     * @returns {Object[]} an array of tasks
     */
    aggregateSectorTasks(sector) {
        const stationTasks = _.flatMap(sector.stations, s =>
            s.aiTasks.map(t => ({ ...t, origin: { type: 'STATION', id: s.id } }))
        );

        const jumpTasks = _.flatMap(sector.jumpPoints, j =>
            j.aiTasks.map(t => ({ ...t, origin: { type: 'JUMP', id: j.id } }))
        );

        return _.concat([], stationTasks, jumpTasks);
    },

    /**
     * Finds the specified origin within the sector and returns it
     * @param {Object} sector the sector to search for the referenced origin
     * @param {Object} origin the origin associated with the task. This is set in aggregateSectorTasks.
     * @returns {Object | null} the requested origin, or null if no origin could be found
     */
    findOrigin(sector, origin) {
        switch (origin.type) {
            case 'STATION':
                return this.findStation(sector, origin.id);
            case 'JUMP':
                return sector.jumpPoints.find(j => j.id === origin.id);
            default:
                return null;
        }
    },

    /**
     * Finds a station within the sector with the specified ID and returns it.
     * @param {Object} sector the sector to search for the station
     * @param {Object} stationId the station ID
     * @returns {Object | null} the station or null if no station could be found
     */
    findStation(sector, stationId) {
        return sector.stations.find(s => s.id === stationId);
    },

    /**
     * Finds the specified destination within the sector and returns it. Some tasks have station destinations
     * while others have more complex constructs
     * @param {Object} sector the sector to search for the referenced destination
     * @param {Object} task the task to look for the destination of
     * @returns {Object | null} the requested destination, or null if no destination could be found
     */
    findDestination(sector, task) {
        if (task.stationId) {
            return this.findStation(sector, task.stationId);
        }
        // TODO: Find jump points
        // TODO: Find locations array for mining ops
        return null;
    },

    /**
     * Builds and returns a ship for the specified task in the sector.
     * @param {Object} sector the sector of space within the game world
     * @param {*} task the AI mission that the ship will fulfill
     * @returns {Object | null} the ship that was generated or null if there was an error generating
     */
    generateShipForTask(sector, task) {
        // Look up relevant information
        const origin = this.findOrigin(sector, task.origin);
        const destination = this.findDestination(sector, task);

        if (!origin) {
            console.warn('Could not find task origin in sector ' + sector.id, task.origin);
            return null;
        }

        let pos, heading;

        if (destination) {
            heading = VectorHelper.getHeadingInDegrees(origin.pos, destination.pos);
            pos = VectorHelper.calculateNewPosition(origin.pos, heading, 50);
        } else {
            console.warn('No destination detected for task', task);
            pos = RandomService.displace(origin.pos, 50);
            heading = VectorHelper.getHeadingInDegrees(origin.pos, pos); // Aim away from launch station
        }

        const ship = ShipService.createShip(
            s => {
                s.heading = heading;
                s.desiredHeading = heading;
                s.name = 'Scout'; // TODO: should have a valid name

                if (destination) {
                    s.navTarget = destination.pos;
                }
            },
            RandomService.randomEnum(Classification), // TODO: Should have an appropriate classification
            RandomService.randomEnum(ContactType), // TODO: Should have an appropriate contact type
            // TODO: Should have an appropriate mission registered
            pos
        );
        return ship;
    },

    buildInitialContacts(sector, player) {
        const initialNPCs = [];

        let nextId = 1;

        const numTasksToGenerate = 5; // TODO: Base the count on sector density

        // TODO: This way of chaining things together is ugly
        _.take(_.shuffle(this.aggregateSectorTasks(sector)), numTasksToGenerate).forEach(task => {
            const ship = this.generateShipForTask(sector, task);
            if (ship) {
                ship.id = nextId++;
                initialNPCs.push(ship);
            }
        });

        return _.concat(initialNPCs, ...sector.stations, ...sector.jumpPoints, player);
    },
};
