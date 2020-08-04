<template>
    <div class="has-text-light">
        <h1 class="title has-text-light">
            Situation
        </h1>
        <h2 class="subtitle has-text-light">
            Main Situation Display Goes here
        </h2>

        <ship-icon text="UNK 4" icon="exclamation-triangle" transform="shrink-10 left-1" />
        <ship-icon text="UNK 5" icon="exclamation-circle" transform="shrink-8" />
        <ship-icon text="UNK 6" icon="exclamation" transform="shrink-8" />
        <ship-icon text="UNK 7" icon="radiation" transform="shrink-8" />
        <ship-icon text="UNK 8" icon="radiation-alt" transform="shrink-6" />
        <ship-icon
            text="PIR 4"
            icon="skull-crossbones"
            transform="shrink-8"
            color="has-text-danger"
        />
        <ship-icon text="RAPTOR 4" color="has-text-success" />
        <ship-icon
            text="BSG-71"
            color="has-text-success"
            icon="campground"
            transform="shrink-9 left-2 up-1"
        />
        <ship-icon text="CYL-R 1" color="has-text-danger" />
        <ship-icon text="CIV 1447" color="has-text-info" />
    </div>
</template>

<script>
import ShipIcon from '@/components/ShipIcon.vue';

export default {
    name: 'Situation',
    components: { ShipIcon },
};
</script>
