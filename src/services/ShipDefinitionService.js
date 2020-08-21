import ContactType from '../enums/ContactType';

export default {
    getMaxThrust(contact) {
        switch (contact.contactType) {
            case ContactType.DREADNAUGHT:
                return 5;
            case ContactType.FREIGHTER:
                return 8;
            case ContactType.CARRIER:
                return 10;
            case ContactType.CRUISER:
                return 12;
            case ContactType.RADIOLOGICAL:
                return 13;
            case ContactType.DESTROYER:
                return 15;
            case ContactType.LIGHT:
                return 18;
            case ContactType.FIGHTER:
                return 25;
            case ContactType.PIRATE:
                return 25;
            case ContactType.MISSILE:
                return 35;
            default:
                return 0;
        }
    },
    getMaxTurn(contact) {
        switch (contact.contactType) {
            case ContactType.DREADNAUGHT:
                return 7;
            case ContactType.FREIGHTER:
                return 5;
            case ContactType.CARRIER:
                return 10;
            case ContactType.CRUISER:
                return 12;
            case ContactType.RADIOLOGICAL:
                return 6;
            case ContactType.DESTROYER:
                return 15;
            case ContactType.LIGHT:
                return 18;
            case ContactType.FIGHTER:
                return 25;
            case ContactType.PIRATE:
                return 20;
            case ContactType.MISSILE:
                return 12;
            default:
                return 10;
        }
    },
    // eslint-disable-next-line no-unused-vars
    getMaxAcceleration(contact) {
        return 15;
    },
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
                children: [
                    { type: 'ENGINE', maxHealth: 5, health: 5 },
                    { type: 'RCS', maxHealth: 3, health: 3 },
                    { type: 'JUMP_DRIVE', maxHealth: 5, health: 5 },
                    { type: 'CPU', maxHealth: 5, health: 5 },
                    { type: 'SENSORS', maxHealth: 3, health: 3, range: 350 },
                ],
            },
        ];
    },
};
