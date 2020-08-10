export default {
    namespaced: true,
    state: {
        requestedThrottle: 0,
    },
    getters: {
        requestedHeading(state, getters, rootState, rootGetters) {
            const playerShip = rootGetters.playerShip;
            return playerShip.desiredHeading;
        },
    },
    actions: {
        setHeading(context, heading) {
            const ship = context.rootGetters.playerShip;
            context.commit(
                'SET_DESIRED_HEADING',
                { contactId: ship.id, value: heading },
                { root: true }
            );
        },
        setThrottle({ commit }, throttle) {
            commit('SET_THROTTLE', throttle);
        },
    },
    mutations: {
        SET_THROTTLE(state, throttle) {
            state.requestedThrottle = throttle;
        },
    },
};
