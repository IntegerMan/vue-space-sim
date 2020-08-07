<template>
    <form class="helm-control">
        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label" for="txtHeading">Heading</label>
            </div>
            <div class="field-body">
                <div class="field has-addons">
                    <p class="control">
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
                    </p>
                    <div class="control">
                        <button class="button is-primary" @click.prevent="setHeading()">
                            Set
                        </button>
                    </div>
                </div>
            </div>
            <div class="field-label is-normal">
                <label class="label" for="txtThrottle">Throttle</label>
            </div>
            <div class="field-body">
                <div class="field has-addons">
                    <p class="control">
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
                    </p>
                    <div class="control">
                        <button class="button is-primary" @click.prevent="setSpeed()">
                            Set
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import KnobControl from 'vue-knob-control'; // Details can be found at https://github.com/kramer99/vue-knob-control

export default {
    name: 'HelmControl',
    components: {
        KnobControl,
    },
    methods: {
        setSpeed() {
            this.$store.dispatch('helm/setThrottle', this.throttle);
        },
        setHeading() {
            this.$store.dispatch('helm/setHeading', this.heading);
        },
    },
    data() {
        return {
            throttle: 0,
            heading: 0,
        };
    },
    computed: {
        throttleColor() {
            if (this.throttle < -75 || this.throttle > 85) {
                return this.dangerColor;
            } else if (this.throttle < 0 || this.throttle > 70) {
                return this.warningColor;
            } else {
                return this.successColor;
            }
        },
        headingColor() {
            return this.successColor;
        },
        primaryColor() {
            return '#e19e47';
        },
        successColor() {
            return '#76b894';
        },
        warningColor() {
            return '#ffdd57';
        },
        dangerColor() {
            return '#d25d5d';
        },
        secondaryColor() {
            return '#101010';
        },
    },
    created() {
        this.throttle = this.$store.state.helm.requestedThrottle;
        this.heading = this.$store.state.helm.requestedHeading;
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
form.helm-control > div.field.is-horizontal {
    align-items: center;

    .field {
        align-items: center;
    }

    button {
        margin-left: $m1;
    }
}
</style>
