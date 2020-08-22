<template>
    <section>
        <div class="has-text-light">
            <h1 class="title has-text-light">Engineering</h1>
        </div>
        <div class="component-container">
            <component-display
                v-for="component of playerComponents"
                :key="component.slotId"
                :component="component"
            />
        </div>
    </section>
</template>

<script>
import ComponentDisplay from '../components/ComponentDisplay.vue';
import ComponentService from '../services/ComponentService.js';

export default {
    name: 'Engineering',
    components: {
        ComponentDisplay,
    },
    computed: {
        playerComponents() {
            const player = this.$store.getters.playerShip;
            return ComponentService.flattenedComponents(player.components);
        },
    },
};
</script>
