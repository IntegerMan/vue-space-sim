import Classification from '@/enums/Classification.js';
import ColorLiterals from '@/helpers/ColorLiterals.js';

export default {
    calculateColorClass(contact) {
        switch (contact.classification) {
            case Classification.FRIENDLY:
                return 'has-text-success';
            case Classification.HOSTILE:
                return 'has-text-danger';
            case Classification.CIVILLIAN:
                return 'has-text-info';
            case Classification.UNCLASSIFIED:
                return 'has-text-primary';
            default:
                return 'has-text-warning';
        }
    },
    calculateColorHex(contact) {
        switch (contact.classification) {
            case Classification.FRIENDLY:
                return ColorLiterals.success;
            case Classification.HOSTILE:
                return ColorLiterals.danger;
            case Classification.CIVILLIAN:
                return ColorLiterals.info;
            case Classification.UNCLASSIFIED:
                return ColorLiterals.primary;
            default:
                return ColorLiterals.warning;
        }
    },
};
