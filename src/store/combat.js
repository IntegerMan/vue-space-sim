import VectorHelper from '../logic/helpers/VectorHelper';

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
        setAimPointToFacePos(context, pos) {
            const ship = context.rootGetters.playerShip;
            const heading = VectorHelper.clampDegreeArc(
                VectorHelper.getHeadingInDegrees(ship.pos, pos),
                ship.heading - 15,
                ship.heading + 15
            );
            context.commit('SET_AIMPOINT', heading - ship.heading);
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
