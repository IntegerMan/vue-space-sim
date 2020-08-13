import SectorService from '../services/SectorService.js';
import Sector from '../enums/Sector.js';

export default {
    namespaced: true,
    state: {
        sectors: [SectorService.loadSector(Sector.START_SECTOR)],
        currentSectorId: null,
    },
    actions: {
        initializeSectors(context) {
            const sectors = SectorService.buildSectors();
            context.commit('LOADED_SECTORS', sectors);
            context.commit('CHANGED_SECTOR', sectors[0].id);
        },
    },
    mutations: {
        LOADED_SECTORS(state, sectors) {
            state.sectors = sectors;
        },
        CHANGED_SECTOR(state, sectorId) {
            state.currentSectorId = sectorId;
        },
    },
    getters: {
        currentSector(state) {
            return state.sectors.find(s => s.id === state.currentSectorId);
        },
    },
};
