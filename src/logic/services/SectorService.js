import Classification from '../enums/Classification.js';
import VectorHelper from '../helpers/VectorHelper.js';

import SectorData from '../../assets/data/Sectors.json';

import ShipService from './ShipService.js';
import RandomService from './RandomService.js';

import _ from 'lodash';
import Point from '@/logic/classes/Point';
import Sector from '@/logic/classes/Sector';
import ContactType from '@/logic/enums/ContactType';
import FixedEntity from '@/logic/classes/Entities/FixedEntity';
import ShipEntity from '@/logic/classes/Entities/ShipEntity';
import ShipDefinitionService from '@/logic/services/ShipDefinitionService';
import AITask from '@/logic/classes/AITask';

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
            .forEach(s => sector.fixedEntities.push(s));

        sectorData.jumpPoints
            .map(j => this.configureJumpPoint(j))
            .forEach(s => sector.fixedEntities.push(s));

        sectorData.hazards
            .map(h => ({ ...h, pos: new Point(h.pos.x, h.pos.y) }))
            .forEach(h => sector.hazards.push(h));

        console.debug('Loaded sector', sector, sectorData);

        return sector;
    },

    /**
     * Finds the specified origin within the sector and returns it
     * @param {Sector} sector the sector to search for the referenced origin
     * @param {Object} origin the origin associated with the task. This is set in aggregateSectorTasks.
     * @returns {Object | null} the requested origin, or null if no origin could be found
     */
    findOrigin(sector, origin) {
        return sector.fixedEntities.find(s => s.id === origin.id);
    },
    /**
     * Finds the specified destination within the sector and returns it. Some tasks have station destinations
     * while others have more complex constructs
     * @param {Sector} sector the sector to search for the referenced destination
     * @param {Object} task the task to look for the destination of
     * @returns {FixedEntity | null} the requested destination, or null if no destination could be found
     */
    findDestination(sector, task) {
        if (task.stationId) {
            return sector.fixedEntities.find(s => s.id === task.stationId);
        }
        // TODO: Find jump points
        // TODO: Find locations array for mining ops
        return null;
    },

    /**
     * Builds and returns a ship for the specified task in the sector.
     * @param {Sector} sector the sector of space within the game world
     * @param {*} task the AI mission that the ship will fulfill
     * @returns {MobileEntity | null} the ship that was generated or null if there was an error generating
     */
    generateShipForTask(sector, task) {
        // Look up relevant information
        const origin = this.findOrigin(sector, task.origin);
        const destination = this.findDestination(sector, task);

        if (!origin) {
            console.warn(`Could not find task origin in sector ${sector.id}`, task.origin);
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

        const entity = new ShipEntity(pos, RandomService.randomEnum(Classification));
        entity.contactType = task.shipType;
        ShipDefinitionService.buildFromTemplate(entity);

        entity.heading = heading;
        entity.desiredHeading = heading;
        entity.id = Math.round(Math.random() * 8999) + 1000; // TODO: Not guaranteed to be unique

        if (destination) {
            entity.navTarget = destination.pos;
        }

        return entity;
    },
    /**
     * Identifies all tasks in the sector, then randomly sorts them and returns up to maxTasks
     * tasks in an array
     *
     * @param {Sector} sector the sector to search
     * @param {Number} maxTasks the number of tasks to take at random
     * @returns {AITask[]} the tasks to return, in random order
     */
    getRandomTasksForSector(sector, maxTasks) {
        return _.take(_.shuffle(sector.getTasks()), maxTasks);
    },
    /**
     * Randomly adds contacts to the sector for tasks declared in the sector
     * @param {Sector} sector the sector
     * @param {PlayerEntity} player the player entity
     */
    buildInitialContacts(sector, player) {
        sector.ships.push(player);

        this.getRandomTasksForSector(sector, sector.initialAiShips)
            .map(task => this.generateShipForTask(sector, task))
            .filter(s => s)
            .forEach(contact => sector.ships.push(contact));
    },
    /**
     * Creates a new Station entity from stored data
     * @param {any} obj the object data from a JSON file
     * @returns {FixedEntity} the created entity
     */
    configureStation(obj) {
        const station = new FixedEntity(
            new Point(obj.pos.x, obj.pos.y),
            ShipService.parseOwner(obj)
        ); // TODO: May want a specific class

        station.name = obj.name || 'Jump Point';
        station.type = 'STATION';
        station.contactType = ContactType.STATION;
        station.size = ShipService.parseTier(obj);
        station.code = obj.id;
        station.aiTasks = obj.aiTasks.map(t => new AITask(t));
        station.id = obj.id;

        return station;
    },
    /**
     * Creates a new Jump Point entity from stored data
     * @param {any} obj the object data from a JSON file
     * @returns {FixedEntity} the created entity
     */
    configureJumpPoint(obj) {
        const jumpPoint = new FixedEntity(new Point(obj.pos.x, obj.pos.y), Classification.NEUTRAL); // TODO: May want a specific class

        jumpPoint.name = obj.name || 'Jump Point';
        jumpPoint.type = 'JUMP_POINT';
        jumpPoint.contactType = ContactType.JUMP_POINT;
        jumpPoint.size = 25;
        jumpPoint.code = obj.id;
        jumpPoint.aiTasks = obj.aiTasks.map(t => new AITask(t));
        jumpPoint.id = obj.id;
        // TODO:Ignoring destPos

        return jumpPoint;
    },
};
