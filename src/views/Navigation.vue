<template>
    <div class="has-text-light">
        <h1 class="title has-text-light">
            Navigation
        </h1>
        <situation-grid :mapMode="mapMode" :zoom="0.5" />
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
            return MapMode.HELM;
        },
    },
};
</script>
