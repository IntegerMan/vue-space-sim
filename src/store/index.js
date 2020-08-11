import Vue from 'vue';
import Vuex from 'vuex';

import Classification from '../enums/Classification.js';
import ContactType from '../enums/ContactType.js';
import simulation from '@/store/simulation.js';
import helm from '@/store/helm.js';
import VectorHelper from '@/helpers/VectorHelper.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        simulation,
        helm,
    },
    state: {
        contacts: [
            {
                id: 1,
                code: 'CVN-71',
                name: 'Concordia',
                isPlayer: true,
                classification: Classification.FRIENDLY,
                contactType: ContactType.CARRIER,
                size: 22,
                heading: 35,
                desiredHeading: 0,
                thrust: 8,
                desiredThrottle: 15,
                pos: {
                    x: 500,
                    y: 500,
                },
            },
            {
                id: 2,
                code: 'UNK-8',
                name: 'Unknown',
                classification: Classification.UNKNOWN,
                contactType: ContactType.UNCLASSIFIED,
                size: 7,
                heading: 288,
                desiredHeading: 288,
                thrust: 15,
                desiredThrottle: 15,
                pos: {
                    x: 755,
                    y: 112,
                },
            },
            {
                id: 3,
                code: 'CIV-134',
                name: 'Pathfinder',
                classification: Classification.CIVILIAN,
                contactType: ContactType.LIGHT,
                size: 8,
                heading: 95,
                desiredHeading: 95,
                thrust: 10,
                desiredThrottle: 10,
                pos: {
                    x: 420,
                    y: 881,
                },
            },
            {
                id: 4,
                code: 'V-9',
                name: '',
                classification: Classification.UNCLASSIFIED,
                contactType: ContactType.RADIOLOGICAL,
                size: 8,
                heading: 70,
                desiredHeading: 70,
                thrust: 25,
                desiredThrottle: 25,
                pos: {
                    x: 395,
                    y: 411,
                },
            },
            {
                id: 5,
                code: 'PIR-8',
                name: 'Raider',
                classification: Classification.HOSTILE,
                contactType: ContactType.PIRATE,
                size: 7,
                heading: 310,
                desiredHeading: 310,
                thrust: 20,
                desiredThrottle: 20,
                pos: {
                    x: 920,
                    y: 640,
                },
            },
        ],
    },
    getters: {
        playerShip(state) {
            return state.contacts.find(c => c.isPlayer);
        },
        contactsRelativeToPlayer(state, getters) {
            const player = getters.playerShip;
            const playerPos = player.pos;
            const viewPortOffset = { x: 500, y: 500 }; // TODO: This should live elsewhere

            return state.contacts.map(c =>
                VectorHelper.translateRelativeToPos(c, playerPos, viewPortOffset)
            );
        },
    },
    actions: {},
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
