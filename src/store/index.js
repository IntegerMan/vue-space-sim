import Vue from 'vue';
import Vuex from 'vuex';

import simulation from './simulation.js';
import helm from './helm.js';

import SectorService from '../services/SectorService.js';
import ShipService from '../services/ShipService.js';

import _ from 'lodash';

import Sector from '../enums/Sector';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        simulation,
        helm,
    },
    state: {
        sector: null,
    },
    getters: {
        currentSector(state) {
            return state.sector;
        },
        playerShip(state, getters) {
            return getters.currentSector.ships.find(c => c.isPlayer);
        },
        playerContacts(state, getters) {
            return ShipService.calculateVisibleContacts(getters.currentSector, getters.playerShip);
        },
        allEntities(state, getters) {
            const sector = getters.currentSector;
            return _.concat(sector.ships, ...sector.jumpPoints, ...sector.stations);
        },
    },
    actions: {
        startGame(context) {
            context.dispatch('loadSector', Sector.START_SECTOR);
        },
        loadSector(context, sectorId) {
            const sector = SectorService.loadSector(sectorId);
            const player = ShipService.createPlayer(sector.playerStartPos || { x: 880, y: 1000 });
            SectorService.buildInitialContacts(sector, player);
            context.commit('SET_SECTOR', sector);
        },
    },
    mutations: {
        SET_SECTOR(state, sector) {
            state.sector = sector;
        },
        SET_DESIRED_HEADING(state, payload) {
            const contact = state.sector.ships.find(c => c.id === payload.contactId);
            contact.desiredHeading = payload.value;
        },
        SET_DESIRED_THROTTLE(state, payload) {
            const contact = state.sector.ships.find(c => c.id === payload.contactId);
            contact.desiredThrottle = payload.value;
        },
        SET_NAV_TARGET(state, payload) {
            const contact = state.sector.ships.find(c => c.id === payload.contactId);
            contact.navTarget = payload.value;
        },
    },
});
