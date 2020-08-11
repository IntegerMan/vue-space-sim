<template>
    <div class="has-text-light">
        <h1 class="title has-text-light">
            Sensors
        </h1>
        <situation-grid :mapMode="mapMode" :zoom="1" />
    </div>
</template>

<script>
import SituationGrid from '@/components/SituationGrid.vue';
import MapMode from '@/enums/MapMode.js';

export default {
    name: 'Sensors',
    components: { SituationGrid },
    computed: {
        mapMode() {
            return MapMode.SENSORS;
        },
    },
};
</script>
