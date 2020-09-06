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

        for (const ship of ships) {
            const context = new SimContext(ship, ships, uiState);

            const simResult = ship.simulate(context);

            // Add any new contacts to our array
            if (simResult.newContacts) {
                for (const contact of simResult.newContacts) {
                    sector.ships.push(contact);
                }
            }
        }

        // Remove any dead entities
        for (const ship of sector.ships.filter(s => s.isDead).slice()) {
            const index = sector.ships.indexOf(ship);
            sector.ships.splice(index, 1);
        }

        // Spawn entities as needed
        if (sector.timeBetweenShipSpawn <= 0) {
            const numShips = sector.ships.filter(s => !s.isPlayer).length;

            if (numShips < sector.maxAiShips) {
                this.spawnForRandomTask(sector);
            }
        } else {
            sector.timeBetweenShipSpawn -= 1;
        }

        return sector;
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
