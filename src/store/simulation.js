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
            const contacts = context.rootState.contacts.map(c => {
                let heading = c.heading;
                if (c.heading !== c.desiredHeading) {
                    const maxTurn = 15; // TODO: This should live elsewhere
                    let distanceRight, distanceLeft;

                    if (c.heading < c.desiredHeading) {
                        distanceLeft = c.heading + 360 - c.desiredHeading;
                        distanceRight = c.desiredHeading - c.heading;
                    } else {
                        distanceLeft = c.heading - c.desiredHeading;
                        distanceRight = 360 - c.heading + c.desiredHeading;
                    }

                    if (distanceLeft < distanceRight) {
                        if (distanceLeft <= maxTurn) {
                            heading = c.desiredHeading;
                        } else {
                            heading -= maxTurn;
                        }
                    } else {
                        if (distanceRight <= maxTurn) {
                            heading = c.desiredHeading;
                        } else {
                            heading += maxTurn;
                        }
                    }

                    while (heading < 0) {
                        heading += 360;
                    }

                    while (heading >= 360) {
                        heading -= 360;
                    }
                }

                return { ...c, heading: heading };
            });
            const newContacts = contacts.map(c => {
                const currentPos = { x: c.x, y: c.y };
                const newPos = VectorHelper.calculateNewPosition(currentPos, c.heading, c.thrust);
                return { ...c, x: newPos.x, y: newPos.y };
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
