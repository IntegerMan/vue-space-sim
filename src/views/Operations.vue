<template>
    <section>
        <div class="has-text-light">
            <h1 class="title has-text-light">Operations</h1>
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
    name: 'Operations',
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

<style scoped lang="scss">
.component-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-auto-flow: row dense;
    column-gap: 1rem;
    row-gap: 0.5rem;
    margin-top: 1rem;
}
</style>
