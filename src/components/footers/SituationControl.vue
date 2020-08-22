<template>
    <form class="footer-control">
        <div class="control vertical-display status-indicators">
            <component-indicator :owner="player" label="Thrusters" type="RCS" />
            <component-indicator :owner="player" label="Engines" type="ENGINE" />
            <component-indicator :owner="player" label="Sensors" type="SENSORS" />
            <component-indicator :owner="player" label="Computer" type="CPU" />
            <component-indicator :owner="player" label="Jump Drive" type="JUMP_DRIVE" />
        </div>
    </form>
</template>

<script>
import ComponentIndicator from '../ComponentIndicator.vue';

export default {
    name: 'SituationControl',
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
