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
};
