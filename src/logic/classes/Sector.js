import Point from '@/logic/classes/Point';

export default class Sector {
    constructor(sectorData) {
        this.ships = [];
        this.fixedEntities = [];
        this.hazards = [];

        if (sectorData.playerStartPos) {
            this.playerStartPos = new Point(
                sectorData.playerStartPos.x,
                sectorData.playerStartPos.y
            );
        }

        this.id = sectorData.id;
        this.initialAiShips = sectorData.initialAiShips;
        this.maxAiShips = sectorData.maxAiShips;
        this.name = sectorData.name;
        this.owner = sectorData.owner;

        this.size = sectorData.size;

        this.minTimeBetweenShipSpawn = sectorData.minTimeBetweenShipSpawn;
        this.timeBetweenShipSpawn = sectorData.minTimeBetweenShipSpawn;
    }
}
