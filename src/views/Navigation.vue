<template>
    <div class="has-text-light">
        <h1 class="title has-text-light">
            Navigation
        </h1>
        <h2 class="subtitle has-text-light">
            Navigation Display Goes here
        </h2>
        <situation-grid />
        <form class="helm-control">
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label has-text-info" for="txtHeading">Heading</label>
                </div>
                <div class="field-body">
                    <div class="field has-addons">
                        <p class="control">
                            <input
                                id="txtHeading"
                                class="input"
                                type="number"
                                min="0"
                                max="360"
                                step="1"
                                v-model.number="heading"
                            />
                        </p>
                        <div class="control">
                            <a class="button is-primary" @click.prevent="setHeading()">
                                Set
                            </a>
                        </div>
                    </div>
                </div>
                <div class="field-label is-normal">
                    <label class="label has-text-info" for="txtThrottle">Throttle</label>
                </div>
                <div class="field-body">
                    <div class="field has-addons">
                        <p class="control">
                            <input
                                id="txtThrottle"
                                class="input"
                                type="number"
                                min="-100"
                                max="100"
                                step="1"
                                v-model.number="throttle"
                            />
                        </p>
                        <div class="control">
                            <a class="button is-primary" @click.prevent="setSpeed()">
                                Set
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import SituationGrid from '@/components/SituationGrid.vue';

export default {
    name: 'Navigation',
    components: { SituationGrid },
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
    created() {
        this.throttle = this.$store.state.helm.requestedThrottle;
        this.heading = this.$store.state.helm.requestedHeading;
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

form.helm-control {
    margin-top: $m2;
}
</style>
