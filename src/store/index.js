import Vue from 'vue';
import Vuex from 'vuex';

import Classification from '../enums/Classification.js';
import ContactType from '../enums/ContactType.js';
import simulation from '@/store/simulation.js';
import helm from '@/store/helm.js';

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
                size: 15,
                heading: 35,
                x: 500,
                y: 500,
            },
            {
                id: 2,
                code: 'UNK-8',
                name: 'Unknown',
                classification: Classification.UNKNOWN,
                contactType: ContactType.UNCLASSIFIED,
                size: 7,
                heading: 288,
                x: 755,
                y: 112,
            },
            {
                id: 3,
                code: 'CIV-134',
                name: 'Joyrider',
                classification: Classification.CIVILLIAN,
                contactType: ContactType.LIGHT,
                size: 3,
                heading: 95,
                x: 420,
                y: 881,
            },
            {
                id: 4,
                code: 'V-9',
                name: '',
                classification: Classification.UNCLASSIFIED,
                contactType: ContactType.RADIOLOGICAL,
                size: 2,
                heading: 70,
                x: 395,
                y: 411,
            },
            {
                id: 5,
                code: 'PIR-8',
                name: 'Raider',
                classification: Classification.HOSTILE,
                contactType: ContactType.PIRATE,
                size: 5,
                heading: 310,
                x: 920,
                y: 640,
            },
        ],
    },
    getters: {},
    actions: {},
    mutations: {},
});
