import Classification from '@/enums/Classification.js';
import ColorLiterals from '@/helpers/ColorLiterals.js';

export default {
    /**
     * Calculates and returns a Bulma CSS class for the given contact
     * @param {Object} contact the contact to generate a class string for
     * @returns {String} a CSS class string intended for displaying on the map
     */
    calculateColorClass(contact) {
        switch (contact.classification) {
            case Classification.FRIENDLY:
                return 'has-text-success';
            case Classification.HOSTILE:
                return 'has-text-danger';
            case Classification.CIVILIAN:
                return 'has-text-info';
            case Classification.UNCLASSIFIED:
                return 'has-text-primary';
            default:
                return 'has-text-warning';
        }
    },

    /**
     * Calculates and returns a hex string for the given contact
     * @param {Object} contact the contact to generate a hex string for
     * @returns {String} a color hex string intended for displaying on the map
     */
    calculateColorHex(contact) {
        switch (contact.classification) {
            case Classification.FRIENDLY:
                return ColorLiterals.success;
            case Classification.HOSTILE:
                return ColorLiterals.danger;
            case Classification.CIVILIAN:
                return ColorLiterals.info;
            case Classification.UNCLASSIFIED:
                return ColorLiterals.primary;
            default:
                return ColorLiterals.warning;
        }
    },
    // eslint-disable-next-line no-unused-vars
    calculateStrokeHex(contact) {
        return ColorLiterals.text;
    },
};
