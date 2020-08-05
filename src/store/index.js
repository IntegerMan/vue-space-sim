import Vue from 'vue';
import Vuex from 'vuex';

import Classification from '../enums/Classification.js';
import ContactType from '../enums/ContactType.js';
import simulation from '@/store/simulation.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        simulation,
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
                x: 84,
                y: 350,
            },
            {
                id: 2,
                code: 'UNK-8',
                name: 'Unknown',
                classification: Classification.UNCLASSIFIED,
                contactType: ContactType.FIGHTER,
                x: 420,
                y: 881,
            },
        ],
    },
    getters: {},
    actions: {},
    mutations: {},
});
