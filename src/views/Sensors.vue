<template>
    <div class="has-text-light">
        <h1 class="title has-text-light">
            Sensors
        </h1>
        <situation-grid :mapMode="mapMode" :zoom="1" :contacts="contacts" :hazards="hazards" />
    </div>
</template>

<script>
import SituationGrid from '../components/situation-grid/SituationGrid.vue';
import MapMode from '../logic/enums/MapMode.js';

export default {
    name: 'Sensors',
    components: { SituationGrid },
    computed: {
        mapMode() {
            return MapMode.SENSORS;
        },
        contacts() {
            return this.$store.getters.playerContacts;
        },
        hazards() {
            return this.$store.getters.currentSector.hazards;
        },
    },
};
</script>
