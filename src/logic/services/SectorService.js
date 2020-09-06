import Classification from '../enums/Classification.js';
import VectorHelper from '../helpers/VectorHelper.js';

import SectorData from '../../assets/data/Sectors.json';

import ShipService from './ShipService.js';
import RandomService from './RandomService.js';

import _ from 'lodash';
import Point from '@/logic/classes/Point';
import Sector from '@/logic/classes/Sector';
import ContactType from '@/logic/enums/ContactType';
import FixedEntity from '@/logic/classes/FixedEntity';

export default {
    loadSector(sectorId) {
        const sectorData = SectorData.find(s => s.id === sectorId);

        if (!sectorData) {
            console.warn('Could not find sector', sectorId, SectorData);
            return null;
        }

        const sector = new Sector(sectorData);

        sectorData.stations
            .map(s => this.configureStation(s))
            .forEach(s => sector.stations.push(s));

        sectorData.jumpPoints
            .map(j => this.configureJumpPoint(j))
            .forEach(s => sector.jumpPoints.push(s));

        sectorData.hazards
            .map(h => ({ ...h, pos: new Point(h.pos.x, h.pos.y) }))
            .forEach(h => sector.hazards.push(h));

        console.debug('Loaded sector', sector, sectorData);

        return sector;
    },
    /**
     * Gathers all potential AI mission tasks in the sector and returns them in a single array
     *
     * @param {Sector} sector the sector that all tasks should be gathered from
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
            pos = origin.pos.displace(50);
            heading = VectorHelper.getHeadingInDegrees(origin.pos, pos); // Aim away from launch station
        }

        return ShipService.createShip(
            s => {
                s.heading = heading;
                s.desiredHeading = heading;
                s.id = Math.round(Math.random() * 8999) + 1000; // TODO: Not guaranteed to be unique

                if (destination) {
                    s.navTarget = destination.pos;
                }
            },
            RandomService.randomEnum(Classification), // TODO: Should have an appropriate classification
            task.shipType,
            // TODO: Should have an appropriate mission registered
            pos
        );
    },

    /**
     * Identifies all tasks in the sector, then randomly sorts them and returns up to maxTasks
     * tasks in an array
     *
     * @param {Object} sector
     * @param {Number} maxTasks
     * @returns {Object[]} the tasks to return, in random order
     */
    getRandomTasksForSector(sector, maxTasks) {
        return _.take(_.shuffle(this.aggregateSectorTasks(sector)), maxTasks);
    },

    buildInitialContacts(sector, player) {
        sector.ships.push(player);

        this.getRandomTasksForSector(sector, sector.initialAiShips)
            .map(task => this.generateShipForTask(sector, task))
            .filter(s => s)
            .forEach(contact => sector.ships.push(contact));
    },

    configureStatic(obj) {
        obj.code = obj.code || '';
        obj.heading = 0;
        obj.desiredHeading = 0;
        obj.throttle = 0;
        obj.desiredThrottle = 0;
        obj.pos = new Point(obj.pos.x, obj.pos.y);
    },
    configureStation(obj) {
        this.configureStatic(obj);

        obj.type = 'STATION';
        obj.contactType = ContactType.STATION;
        obj.size = ShipService.parseTier(obj);
        obj.classification = ShipService.parseOwner(obj);

        return obj;
    },
    /**
     * Creates a new Jump Point entity from stored data representing a jump point
     * @param {any} obj the object data from a JSON file
     * @returns {FixedEntity} the created entity
     */
    configureJumpPoint(obj) {
        const jumpPoint = new FixedEntity(obj.pos, Classification.NEUTRAL); // TODO: May want a specific class

        jumpPoint.name = obj.name || 'Jump Point';
        jumpPoint.type = 'JUMP_POINT';
        jumpPoint.contactType = ContactType.JUMP_POINT;
        jumpPoint.size = 25;
        jumpPoint.code = obj.id;
        jumpPoint.aiTasks = obj.aiTasks;
        jumpPoint.id = obj.id;
        // TODO:Ignoring destPos

        return jumpPoint;
    },
};
