import Vue from 'vue';
import Vuex from 'vuex';

import simulation from './simulation.js';
import helm from './helm.js';
import combat from './combat.js';

import SectorService from '../logic/services/SectorService.js';
import ShipService from '../logic/services/ShipService.js';

import _ from 'lodash';

import Sector from '../logic/enums/Sector';
import Point from '@/logic/classes/Point';
import PlayerEntity from '@/logic/classes/Entities/PlayerEntity';
import ShipDefinitionService from '@/logic/services/ShipDefinitionService';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        simulation,
        helm,
        combat,
    },
    state: {
        sector: null,
    },
    getters: {
        currentSector(state) {
            return state.sector;
        },
        playerShip(state, getters) {
            return getters.currentSector.ships.find(c => c.isPlayer());
        },
        playerContacts(state, getters) {
            return ShipService.calculateVisibleContacts(getters.currentSector, getters.playerShip);
        },
        allEntities(state, getters) {
            const sector = getters.currentSector;
            return _.concat(sector.ships, ...sector.fixedEntities);
        },
    },
    actions: {
        startGame(context) {
            context.dispatch('loadSector', Sector.START_SECTOR);
        },
        loadSector(context, sectorId) {
            const sector = SectorService.loadSector(sectorId);
            const player = new PlayerEntity(sector.playerStartPos || new Point(880, 1000));
            ShipDefinitionService.buildFromTemplate(player);
            SectorService.buildInitialContacts(sector, player);
            console.debug('Sector Loaded', sector);
            context.commit('SET_SECTOR', sector);
        },
        toggleComponent(context, payload) {
            context.commit('TOGGLE_COMPONENT', payload);
        },
        simulationAdvanced(context, newSector) {
            context.dispatch('combat/simulationAdvanced', newSector);
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
        TOGGLE_COMPONENT(state, payload) {
            const contact = state.sector.ships.find(c => c.id === payload.contactId);
            const targetComponent = contact.getAllComponents().find(c => c === payload.component);

            if (targetComponent) {
                targetComponent.isOn = !targetComponent.isOn;
            } else {
                console.warn('Could not find component to toggle', payload);
            }
        },
    },
});
