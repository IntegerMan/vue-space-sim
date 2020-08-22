export default {
    /**
     * Builds and returns the array of components that belong in a ship of a given
     * ship type.
     * @param {Number} _shipType the type of ship
     * @returns {Array} the components belonging to the ship
     */
    // eslint-disable-next-line no-unused-vars
    buildComponentsForShipType(shipType) {
        return [
            {
                type: 'CORE',
                maxHealth: 10,
                health: 10,
                isOn: null,
                children: [
                    {
                        type: 'ENGINE',
                        maxHealth: 5,
                        health: 5,
                        maxThrust: 30,
                        maxAcceleration: 5,
                        isOn: true,
                    },
                    { type: 'RCS', maxHealth: 3, health: 3, turnSpeed: 15, isOn: true },
                    { type: 'JUMP_DRIVE', maxHealth: 5, health: 5, isOn: false },
                    { type: 'CPU', maxHealth: 5, health: 5, isOn: true },
                    { type: 'SENSORS', maxHealth: 3, health: 3, range: 350, isOn: true },
                ],
            },
        ];
    },
};
