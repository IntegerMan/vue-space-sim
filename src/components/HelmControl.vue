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
import ColorLiterals from '@/helpers/ColorLiterals.js';

export default {
    name: 'HelmControl',
    components: {
        KnobControl,
    },
    methods: {},
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
</style>
