import SimulationService from '../logic/services/SimulationService.js';
import UIState from '@/logic/classes/UIState';

const simulation = {
    namespaced: true,
    state: {
        speed: 0,
    },
    actions: {
        pause({ commit }) {
            commit('SET_SPEED', 0);
        },
        play({ commit }) {
            commit('SET_SPEED', 1);
        },
        advance(context) {
            const uiState = new UIState(
                context.rootGetters['combat/isFiring'],
                context.rootGetters['combat/aimPoint']
            );

            const sector = context.rootGetters.currentSector;
            const newSector = SimulationService.simulateAll(sector, uiState);

            context.commit('SET_SECTOR', newSector, { root: true });
            context.dispatch('simulationAdvanced', sector, { root: true });
        },
        advanceOne({ dispatch }) {
            dispatch('pause');
            dispatch('advance');
        },
        fastForward({ commit }) {
            commit('SET_SPEED', 2);
        },
    },
    mutations: {
        SET_SPEED(state, speed) {
            state.speed = speed;
        },
    },
};

export default simulation;
