export default class UIState {
    /**
     * Creates a new instance of UIState
     * @param {Boolean} isFiring whether or not the player is firing
     * @param {Number} aimPoint a numeric offset in degrees of the player's current aim
     */
    constructor(isFiring, aimPoint) {
        this.isFiring = isFiring;
        this.aimPoint = aimPoint;
    }
}
