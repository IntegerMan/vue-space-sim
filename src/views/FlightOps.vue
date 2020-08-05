<template>
    <div class="has-text-light">
        <h1 class="title has-text-light">
            Flight Ops
        </h1>
        <h2 class="subtitle has-text-light">
            Flight Operations Display Goes here
        </h2>
        <situation-grid />
    </div>
</template>

<script>
import SituationGrid from '@/components/SituationGrid.vue';

export default {
    name: 'FlightOps',
    components: { SituationGrid },
};
</script>
