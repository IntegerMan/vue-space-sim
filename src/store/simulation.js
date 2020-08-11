import VectorHelper from '../helpers/VectorHelper.js';

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
            const newContacts = context.rootState.contacts
                .map(c => {
                    return {
                        ...c,
                        heading: VectorHelper.steerTowardsHeading(
                            c.heading,
                            c.desiredHeading,
                            15 // TODO: Max Turn should live elsewhere
                        ),
                        thrust: VectorHelper.moveTowardsSetThrottle(
                            c.thrust,
                            c.desiredThrottle,
                            15 // TODO: Max throttle change should live elsewhere
                        ),
                    };
                })
                .map(c => {
                    return {
                        ...c,
                        pos: VectorHelper.calculateNewPosition(c.pos, c.heading, c.thrust),
                    };
                });

            context.commit('UPDATE_CONTACTS', newContacts, { root: true });
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
