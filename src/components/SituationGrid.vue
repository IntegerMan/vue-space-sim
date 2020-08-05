<template>
    <div class="situation-grid has-background-black">
        <ship-icon v-for="contact of contacts" :key="contact.id" :contact="contact" />
    </div>
</template>

<script>
import ShipIcon from '@/components/ShipIcon.vue';

export default {
    name: 'SituationGrid',
    components: {
        ShipIcon,
    },
    computed: {
        contacts() {
            return this.$store.state.contacts;
        },
    },
};
</script>

<style lang="scss">
.situation-grid {
    width: 300px;
    height: 300px;
}
</style>
