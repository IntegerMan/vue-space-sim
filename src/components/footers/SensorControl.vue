<template>
    <form class="footer-control">
        <div class="control vertical-display status-indicators">
            <component-indicator :owner="player" label="Sensors" type="SENSORS" />
            <component-indicator :owner="player" label="Computer" type="CPU" />
        </div>
    </form>
</template>

<script>
import ComponentIndicator from '../ComponentIndicator.vue';

export default {
    name: 'SensorControl',
    components: {
        ComponentIndicator,
    },
    computed: {
        player() {
            return this.$store.getters.playerShip;
        },
    },
};
</script>
