<template>
    <form class="footer-control">
        <div class="control" v-if="canAim">
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
                :min="minAimPoint"
                :max="maxAimPoint"
            />
        </div>
        <div class="control vertical-display" v-if="canFire">
            <!-- TODO: This should be a v-for for multi-weapon systems -->
            <span class="tag is-warning is-light" v-if="loading">Loading</span>
            <span class="tag is-success" v-if="ready && !isFiring">Ready</span>
            <span class="tag is-primary is-light" v-if="isFiring">Firing</span>
            <button
                class="button is-rounded is-small btn-fire is-danger"
                :class="{ active: isFiring }"
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
            <!-- TODO: This should be a v-for for multi-weapon systems -->
            <component-indicator :owner="player" label="Weapons" type="WEAPON" />
        </div>
    </form>
</template>

<script>
import KnobControl from 'vue-knob-control'; // Details can be found at https://github.com/kramer99/vue-knob-control
import ComponentIndicator from '../ComponentIndicator.vue';
import ColorLiterals from '../../logic/helpers/ColorLiterals.js';
import CombatService from '../../logic/services/CombatService.js';

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
        primaryColor() {
            return ColorLiterals.warning;
        },
        secondaryColor() {
            return ColorLiterals.background;
        },
        weapons() {
            return CombatService.weapons(this.player);
        },
        minAimPoint() {
            return CombatService.minAimPoint(this.player);
        },
        maxAimPoint() {
            return CombatService.maxAimPoint(this.player);
        },
        canAim() {
            return this.minAimPoint !== 0 || this.maxAimPoint !== 0;
        },
        canFire() {
            return this.weapons.filter(c => c.isOn === true).length > 0;
        },
        ready() {
            return this.weapons.filter(c => c.isOn === true).length > 0;
        },
        loading() {
            return false;
        },
        isFiring() {
            return this.$store.getters['combat/isFiring'];
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

.btn-fire.active {
    font-weight: bold;
}
</style>
