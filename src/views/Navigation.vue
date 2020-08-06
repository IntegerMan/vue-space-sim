<template>
    <div class="has-text-light">
        <h1 class="title has-text-light">
            Navigation
        </h1>
        <h2 class="subtitle has-text-light">
            Navigation Display Goes here
        </h2>
        <situation-grid />
        <helm-control />
    </div>
</template>

<script>
import SituationGrid from '@/components/SituationGrid.vue';
import HelmControl from '@/components/HelmControl.vue';

export default {
    name: 'Navigation',
    components: { SituationGrid, HelmControl },
};
</script>
