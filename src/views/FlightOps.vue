<template>
    <div class="has-text-light">
        <h1 class="title has-text-light">Flight Ops</h1>
        <situation-grid :mapMode="mapMode" :zoom="0.75" />
    </div>
</template>

<script>
import SituationGrid from '@/components/SituationGrid.vue';
import MapMode from '@/enums/MapMode.js';

export default {
    name: 'FlightOps',
    components: { SituationGrid },
    computed: {
        mapMode() {
            return MapMode.FLIGHTOPS;
        },
    },
};
</script>
