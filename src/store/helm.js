import VectorHelper from '../logic/helpers/VectorHelper';

export default {
    namespaced: true,
    state: {},
    getters: {
        requestedHeading(state, getters, rootState, rootGetters) {
            const playerShip = rootGetters.playerShip;
            return playerShip.desiredHeading;
        },
        requestedThrottle(state, getters, rootState, rootGetters) {
            const playerShip = rootGetters.playerShip;
            return playerShip.desiredThrottle;
        },
    },
    actions: {
        setHeadingToFacePos(context, pos) {
            const ship = context.rootGetters.playerShip;
            const heading = VectorHelper.getHeadingInDegrees(ship.pos, pos);
            context.commit(
                'SET_DESIRED_HEADING',
                { contactId: ship.id, value: heading },
                { root: true }
            );
        },
        setHeading(context, heading) {
            const ship = context.rootGetters.playerShip;
            context.commit(
                'SET_DESIRED_HEADING',
                { contactId: ship.id, value: heading },
                { root: true }
            );
        },
        setNavTarget(context, pos) {
            const ship = context.rootGetters.playerShip;
            context.commit('SET_NAV_TARGET', { contactId: ship.id, value: pos }, { root: true });
        },
        setThrottle(context, throttle) {
            const ship = context.rootGetters.playerShip;
            context.commit(
                'SET_DESIRED_THROTTLE',
                { contactId: ship.id, value: throttle },
                { root: true }
            );
        },
    },
    mutations: {},
};
