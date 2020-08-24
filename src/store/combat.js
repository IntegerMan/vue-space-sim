// import VectorHelper from '../logic/helpers/VectorHelper';

export default {
    namespaced: true,
    state: {
        aimPoint: 0,
    },
    getters: {
        aimPoint(state) {
            return state.aimPoint;
        },
    },
    actions: {
        setAimPoint(context, degreeDiff) {
            context.commit('SET_AIMPOINT', degreeDiff);
        },
        fire(context) {
            const ship = context.rootGetters.playerShip;
            console.log('Fire weapons invoked', ship);
        },
    },
    mutations: {
        SET_AIMPOINT(state, aimPoint) {
            state.aimPoint = aimPoint;
        },
    },
};
