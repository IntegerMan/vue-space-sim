import SectorService from './SectorService';
import SimContext from '@/logic/classes/SimContext';

export default {
    /**
     * Simulates the sector and returns a new version of that sector
     * @param {Sector} sector the sector the contacts are in
     * @param {UIState} uiState any flags from various controls that might be relevant to simulating
     * @returns {Sector} the updated sector
     */
    simulateAll(sector, uiState) {
        const ships = sector.ships.slice();

        ships.forEach(ship => {
            this.simulate(ship, ships, uiState, sector);
        });

        // Remove any dead entities
        for (const ship of sector.ships.filter(s => s.isDead).slice()) {
            const index = sector.ships.indexOf(ship);
            sector.ships.splice(index, 1);
        }

        // Spawn entities as needed
        if (sector.timeBetweenShipSpawn <= 0) {
            const numShips = sector.ships.filter(s => !s.isPlayer()).length;

            if (numShips < sector.maxAiShips) {
                this.spawnForRandomTask(sector);
            }
        } else {
            sector.timeBetweenShipSpawn -= 1;
        }

        return sector;
    },
    /**
     *
     * @param ship {MobileEntity}
     * @param ships {MobileEntity[]}
     * @param uiState {UIState}
     * @param sector {Sector}
     */
    simulate(ship, ships, uiState, sector) {
        const simResult = ship.simulate(new SimContext(ship, ships, uiState));

        // Add any new contacts to our array
        sector.ships.push(...simResult.newContacts);
    },
    /**
     * Spawns entities for a random task inside of the sector and adds the entities to the sector.
     * @param {Sector} sector the sector
     */
    spawnForRandomTask(sector) {
        SectorService.getRandomTasksForSector(sector, 1)
            .map(task => SectorService.generateShipForTask(sector, task))
            .filter(s => s)
            .forEach(s => {
                console.debug('New Contact created', s);
                sector.ships.push(s);
                sector.timeBetweenShipSpawn = sector.minTimeBetweenShipSpawn;
            });
    },
};
