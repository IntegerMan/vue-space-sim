export default {
    namespaced: true,
    state: {
        requestedThrottle: 0,
        requestedHeading: 0,
    },
    actions: {
        setHeading({ commit }, heading) {
            commit('SET_HEADING', heading);
        },
        setThrottle({ commit }, throttle) {
            commit('SET_THROTTLE', throttle);
        },
    },
    mutations: {
        SET_HEADING(state, heading) {
            state.requestedHeading = heading;
        },
        SET_THROTTLE(state, throttle) {
            state.requestedThrottle = throttle;
        },
    },
};
