<template>
    <div class="has-text-light">
        <h1 class="title has-text-light">
            Combat
        </h1>
        <situation-grid :mapMode="mapMode" />
    </div>
</template>

<script>
import SituationGrid from '@/components/SituationGrid.vue';
import MapMode from '@/enums/MapMode.js';

export default {
    name: 'Combat',
    components: { SituationGrid },
    computed: {
        mapMode() {
            return MapMode.COMBAT;
        },
    },
};
</script>
