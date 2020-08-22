<template>
    <form class="sensor-control">
        <div class="control vertical-display status-indicators">
            <component-indicator :owner="player" label="Sensors" type="SENSORS" />
            <component-indicator :owner="player" label="Computer" type="CPU" />
        </div>
    </form>
</template>

<script>
import ComponentIndicator from '../ComponentIndicator.vue';

export default {
    name: 'HelmControl',
    components: {
        ComponentIndicator,
    },
    data() {
        return {};
    },
    computed: {
        player() {
            return this.$store.getters.playerShip;
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.sensor-control {
    display: flex;
    justify-content: space-around;
    height: 100%;

    > .control {
        display: flex;
        align-items: center;
    }

    label {
        margin-right: $m1;
    }
}
</style>
