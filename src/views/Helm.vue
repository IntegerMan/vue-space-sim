<template>
    <div class="has-text-light">
        <h1 class="title has-text-light">
            Helm
        </h1>
        <situation-grid
            :mapMode="mapMode"
            :zoom="1"
            @LocationClick="handleClick($event)"
            :contacts="contacts"
            :hazards="hazards"
        />
    </div>
</template>

<script>
import SituationGrid from '../components/situation-grid/SituationGrid.vue';
import MapMode from '../logic/enums/MapMode.js';

export default {
    name: 'Navigation',
    components: { SituationGrid },
    computed: {
        mapMode() {
            return MapMode.HELM;
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
            this.$store.dispatch('helm/setHeadingToFacePos', pos);
        },
    },
};
</script>
