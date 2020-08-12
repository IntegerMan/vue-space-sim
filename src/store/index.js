import Vue from 'vue';
import Vuex from 'vuex';

import simulation from './simulation.js';
import helm from './helm.js';

import VectorHelper from '../helpers/VectorHelper.js';
import Sector from '../enums/Sector.js';
import SectorService from '../services/SectorService.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        simulation,
        helm,
    },
    state: {
        contacts: [],
    },
    getters: {
        playerShip(state) {
            return state.contacts.find(c => c.isPlayer);
        },
        contactsRelativeToPlayer(state, getters) {
            const player = getters.playerShip;
            const playerPos = player.pos;
            const viewPortSize = { x: 1000, y: 1000 }; // TODO: This should live elsewhere

            return state.contacts.map(c =>
                VectorHelper.translateRelativeToPos(c, playerPos, viewPortSize)
            );
        },
    },
    actions: {
        startGame(context) {
            context.dispatch('populateSector', Sector.START_SECTOR);
        },
        populateSector(context, sector) {
            const contacts = SectorService.buildInitialContacts(sector);
            context.commit('UPDATE_CONTACTS', contacts);
        },
    },
    mutations: {
        UPDATE_CONTACTS(state, contacts) {
            state.contacts = contacts;
        },
        SET_DESIRED_HEADING(state, payload) {
            const contact = state.contacts.find(c => c.id === payload.contactId);
            contact.desiredHeading = payload.value;
        },
        SET_DESIRED_THROTTLE(state, payload) {
            const contact = state.contacts.find(c => c.id === payload.contactId);
            contact.desiredThrottle = payload.value;
        },
    },
});
