import VectorHelper from '../logic/helpers/VectorHelper';
import CombatService from '../logic/services/CombatService.js';

export default {
    namespaced: true,
    state: {
        aimPoint: 0,
        isFiring: false,
    },
    getters: {
        aimPoint(state) {
            return state.aimPoint;
        },
        isFiring(state) {
            return state.isFiring;
        },
    },
    actions: {
        setAimPoint(context, degreeDiff) {
            context.commit('SET_AIMPOINT', VectorHelper.preferNegativeDegrees(degreeDiff));
        },
        setAimPointToFacePos(context, pos) {
            const ship = context.rootGetters.playerShip;
            const heading = VectorHelper.clampDegreeArc(
                Math.round(VectorHelper.getHeadingInDegrees(ship.pos, pos)),
                ship.heading + CombatService.minAimPoint(ship),
                ship.heading + CombatService.maxAimPoint(ship)
            );
            context.commit(
                'SET_AIMPOINT',
                VectorHelper.preferNegativeDegrees(heading - ship.heading)
            );
        },
        fire(context) {
            context.commit('SET_IS_FIRING', !context.getters.isFiring);
        },
    },
    mutations: {
        SET_AIMPOINT(state, aimPoint) {
            state.aimPoint = aimPoint;
        },
        SET_IS_FIRING(state, firing) {
            state.isFiring = firing;
        },
    },
};
