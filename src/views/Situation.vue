<template>
    <div class="has-text-light">
        <h1 class="title has-text-light">
            Situation
        </h1>

        <situation-grid :mapMode="mapMode" :zoom="1" :contacts="contacts" :hazards="hazards" />
    </div>
</template>

<script>
import SituationGrid from '@/components/SituationGrid.vue';
import MapMode from '@/enums/MapMode.js';

export default {
    name: 'Situation',
    components: { SituationGrid },
    computed: {
        mapMode() {
            return MapMode.SITUATION;
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
