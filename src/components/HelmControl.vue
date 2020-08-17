<template>
    <form class="helm-control">
        <div class="control">
            <label class="label" for="txtHeading">Heading</label>
            <knob-control
                id="txtHeading"
                v-model.number="heading"
                :primaryColor="headingColor"
                :secondaryColor="secondaryColor"
                :animation="{
                    animated: true,
                    animateValue: true,
                    animationDuration: '5000',
                    animationFunction: 'linear',
                }"
                :min="0"
                :max="360"
            />
            <div class="match-heading" v-if="navTarget">
                <span
                    class="tag"
                    :class="{ 'is-warning is-light': !navMatched, 'is-success': navMatched }"
                    >Requested: {{ Math.round(requestedHeading) }}'
                </span>
                <button
                    class="button is-primary is-rounded is-small"
                    title="Set the current desired heading to that requested by the Navigation station"
                    :disabled="navMatched"
                    @click.prevent="matchNavTarget()"
                >
                    Match
                </button>
            </div>
            <div class="match-heading" v-else>
                <span class="tag is-dark">No Nav Target</span>
                <button class="button is-primary is-rounded is-small" disabled>
                    Match
                </button>
            </div>
        </div>
        <div class="control">
            <label class="label" for="txtThrottle">Throttle</label>
            <knob-control
                id="txtThrottle"
                v-model.number="throttle"
                :min="-100"
                :max="100"
                :primaryColor="throttleColor"
                :secondaryColor="secondaryColor"
                :animation="{
                    animated: true,
                    animateValue: true,
                    animationDuration: '5000',
                    animationFunction: 'linear',
                }"
            />
        </div>
    </form>
</template>

<script>
import KnobControl from 'vue-knob-control'; // Details can be found at https://github.com/kramer99/vue-knob-control
import ColorLiterals from '../helpers/ColorLiterals.js';
import VectorHelper from '../helpers/VectorHelper.js';

export default {
    name: 'HelmControl',
    components: {
        KnobControl,
    },
    data() {
        return {
            throttle: 0,
            heading: 0,
        };
    },
    watch: {
        throttle: function(newVal) {
            this.$store.dispatch('helm/setThrottle', newVal);
        },
        heading: function(newVal) {
            this.$store.dispatch('helm/setHeading', newVal);
        },
    },
    methods: {
        matchNavTarget() {
            this.heading = Math.round(this.requestedHeading);
        },
    },
    computed: {
        throttleColor() {
            if (this.throttle < -75 || this.throttle > 85) {
                return ColorLiterals.danger;
            } else if (this.throttle < 0 || this.throttle > 70) {
                return ColorLiterals.warning;
            } else {
                return ColorLiterals.success;
            }
        },
        navTarget() {
            return this.$store.getters.playerShip.navTarget;
        },
        navMatched() {
            const player = this.$store.getters.playerShip;
            return player.desiredHeading === Math.round(this.requestedHeading);
        },
        requestedHeading() {
            const player = this.$store.getters.playerShip;
            return VectorHelper.getHeadingInDegrees(player.pos, player.navTarget);
        },
        headingColor() {
            return ColorLiterals.success;
        },
        secondaryColor() {
            return ColorLiterals.background;
        },
    },
    created() {
        this.throttle = this.$store.getters['helm/requestedThrottle'];
        this.heading = this.$store.getters['helm/requestedHeading'];
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.helm-control {
    display: flex;
    justify-content: space-around;

    > .control {
        display: flex;
        align-items: center;
    }

    label {
        margin-right: $m1;
    }
}

.match-heading {
    display: flex;
    flex-direction: column;
    align-content: space-evenly;
    justify-content: space-evenly;
    margin-left: $m2;

    button {
        margin-top: $m1;
    }
}
</style>
