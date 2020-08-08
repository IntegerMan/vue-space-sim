<template>
    <div class="has-text-light">
        <h1 class="title has-text-light">
            Navigation
        </h1>
        <situation-grid />
    </div>
</template>

<script>
import SituationGrid from '@/components/SituationGrid.vue';

export default {
    name: 'Navigation',
    components: { SituationGrid },
};
</script>
