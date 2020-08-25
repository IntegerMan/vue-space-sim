<template>
    <div class="has-text-light">
        <h1 class="title has-text-light">Combat</h1>
        <situation-grid
            :mapMode="mapMode"
            :zoom="1"
            :contacts="contacts"
            :hazards="hazards"
            @LocationClick="handleClick($event)"
        />
    </div>
</template>

<script>
import SituationGrid from '../components/situation-grid/SituationGrid.vue';
import MapMode from '../logic/enums/MapMode.js';

export default {
    name: 'Combat',
    components: { SituationGrid },
    computed: {
        mapMode() {
            return MapMode.COMBAT;
        },
        contacts() {
            return this.$store.getters.playerContacts;
        },
        hazards() {
            return this.$store.getters.currentSector.hazards;
        },
    },
    methods: {
        handleClick(pos) {
            this.$store.dispatch('combat/setAimPointToFacePos', pos);
        },
    },
};
</script>
