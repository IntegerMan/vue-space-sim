export default {
    createShip(classification, shipType, pos, configureFunc) {
        const ship = {
            id: -1,
            code: '',
            name: 'TODO',
            isPlayer: false,
            classification: classification,
            contactType: shipType,
            size: 15,
            heading: 0,
            desiredHeading: 0,
            thrust: 8,
            desiredThrottle: 8,
            pos: pos,
        };

        if (configureFunc) {
            configureFunc(ship);
        }

        return ship;
    },
};
