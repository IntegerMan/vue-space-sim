<template>
    <div class="has-text-light">
        <h1 class="title has-text-light">Debug View</h1>
        <situation-grid :mapMode="mapMode" />
    </div>
</template>

<script>
import SituationGrid from '@/components/SituationGrid.vue';
import MapMode from '@/enums/MapMode.js';

export default {
    name: 'Debug',
    components: { SituationGrid },
    computed: {
        mapMode() {
            return MapMode.DEBUG;
        },
    },
};
</script>
