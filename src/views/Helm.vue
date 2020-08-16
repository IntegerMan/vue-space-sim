<template>
    <div class="has-text-light">
        <h1 class="title has-text-light">
            Helm
        </h1>
        <situation-grid :mapMode="mapMode" :zoom="1.5" @LocationClick="handleClick($event)" />
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
    methods: {
        handleClick(pos) {
            this.$store.dispatch('helm/setHeadingToFacePos', pos);
        },
    },
};
</script>
