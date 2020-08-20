<template>
    <div class="has-text-light">
        <h1 class="title has-text-light">
            Navigation
        </h1>
        <situation-grid
            :mapMode="mapMode"
            :zoom="0.5"
            :centerOnPlayer="false"
            :contacts="contacts"
            @LocationClick="handleClick($event)"
        />
    </div>
</template>

<script>
import SituationGrid from '@/components/SituationGrid.vue';
import MapMode from '@/enums/MapMode.js';

export default {
    name: 'Navigation',
    components: { SituationGrid },
    computed: {
        mapMode() {
            return MapMode.NAV;
        },
        contacts() {
            return this.$store.getters.playerContacts;
        },
    },
    methods: {
        handleClick(pos) {
            this.$store.dispatch('helm/setNavTarget', pos);
        },
    },
};
</script>
