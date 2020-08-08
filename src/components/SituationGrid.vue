<template>
    <div class="situation-grid has-background-black">
        <svg width="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMinYMin meet">
            <ContactSVGRenderer v-for="contact of contacts" :key="contact.id" :contact="contact" />
            <div v-if="false">
                <ship-icon v-for="contact of contacts" :key="contact.id" :contact="contact" />
            </div>
        </svg>
    </div>
</template>

<script>
import ShipIcon from '@/components/ShipIcon.vue';
import ContactSVGRenderer from '@/components/ContactSVGRenderer.vue';
import ShipFormatter from '@/helpers/ShipFormatter.js';

export default {
    name: 'SituationGrid',
    components: {
        ShipIcon,
        ContactSVGRenderer,
    },
    computed: {
        contacts() {
            return this.$store.state.contacts;
        },
    },
    methods: {
        calculateColorHex(contact) {
            return ShipFormatter.calculateColorHex(contact);
        },
    },
};
</script>

<style lang="scss"></style>
