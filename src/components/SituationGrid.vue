<template>
    <div class="situation-grid has-background-black">
        <svg width="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMinYMin meet">
            <g id="gridLines">
                <line
                    v-for="line of mapGridLines"
                    :key="'vertLine' + line"
                    :x1="line * lineSize"
                    :x2="line * lineSize"
                    :y1="0"
                    :y2="1000"
                    :stroke="lineStroke"
                    :stroke-width="1"
                />
                <line
                    v-for="line of mapGridLines"
                    :key="'horizLine' + line"
                    :y1="line * lineSize"
                    :y2="line * lineSize"
                    :x1="0"
                    :x2="1000"
                    :stroke="lineStroke"
                    :stroke-width="1"
                />
            </g>
            <ContactSVGRenderer
                v-for="contact of contacts"
                :key="contact.id"
                :contact="contact"
                :mapMode="mapMode"
            />
        </svg>
    </div>
</template>

<script>
import ContactSVGRenderer from '@/components/ContactSVGRenderer.vue';
import ShipFormatter from '@/helpers/ShipFormatter.js';
import ColorLiterals from '@/helpers/ColorLiterals.js';

export default {
    name: 'SituationGrid',
    props: {
        mapMode: Number,
    },
    components: {
        ContactSVGRenderer,
    },
    computed: {
        contacts() {
            return this.$store.state.contacts;
        },
        mapGridLines() {
            return 5; // For best effect, this should be odd so the player ship isn't crosshaired
        },
        lineSize() {
            return 1000 / this.mapGridLines;
        },
        lineStroke() {
            return ColorLiterals.text;
        },
    },
    methods: {
        calculateColorHex(contact) {
            return ShipFormatter.calculateColorHex(contact);
        },
    },
};
</script>

<style lang="scss">
.situation-grid {
    width: 28rem;
}
</style>
