<template>
    <form class="footer-control">
        <div class="control">
            <label class="label" for="txtAim">Aim Point</label>
            <knob-control
                id="txtAim"
                v-model.number="aimPoint"
                :primaryColor="primaryColor"
                :secondaryColor="secondaryColor"
                :animation="{
                    animated: true,
                    animateValue: true,
                    animationDuration: '5000',
                    animationFunction: 'linear',
                }"
                :min="-15"
                :max="15"
            />
        </div>
        <div class="control vertical-display">
            <span class="tag is-warning is-light" v-if="loading">Loading</span>
            <span class="tag is-success" v-if="ready">Ready</span>
            <button
                class="button is-danger is-rounded is-small"
                title="Fire Weapons"
                :disabled="!ready"
                @click.prevent="fire()"
            >
                Fire
            </button>
        </div>
        <div class="control vertical-display status-indicators">
            <component-indicator :owner="player" label="Sensors" type="SENSORS" />
            <component-indicator :owner="player" label="Computer" type="CPU" />
        </div>
    </form>
</template>

<script>
import KnobControl from 'vue-knob-control'; // Details can be found at https://github.com/kramer99/vue-knob-control
import ComponentIndicator from '../ComponentIndicator.vue';
import ColorLiterals from '../../logic/helpers/ColorLiterals.js';

export default {
    name: 'CombatControl',
    components: {
        KnobControl,
        ComponentIndicator,
    },
    methods: {
        fire() {
            this.$store.dispatch('combat/fire');
        },
    },
    computed: {
        player() {
            return this.$store.getters.playerShip;
        },
        ready() {
            return true;
        },
        loading() {
            return false;
        },
        primaryColor() {
            return ColorLiterals.warning;
        },
        secondaryColor() {
            return ColorLiterals.background;
        },
        aimPoint: {
            get() {
                return this.$store.getters['combat/aimPoint'];
            },
            set(value) {
                this.$store.dispatch('combat/setAimPoint', value);
            },
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.match-heading {
    margin-left: $m2;
}
</style>
