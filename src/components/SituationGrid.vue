<template>
    <div class="situation-grid has-background-black">
        <svg
            width="100%"
            :viewBox="'0 0 ' + viewPortSize.width + ' ' + viewPortSize.height"
            preserveAspectRatio="xMinYMin meet"
            shape-rendering="auto"
        >
            <g id="gridLines" :stroke="lineStroke" :stroke-width="2" stroke-dasharray="2,5">
                <line
                    v-for="x of verticalGridLines"
                    :key="'vertLine' + x"
                    :x1="x"
                    :x2="x"
                    :y1="0"
                    :y2="viewPortSize.height"
                />
                <line
                    v-for="y of horizontalGridLines"
                    :key="'horizLine' + y"
                    :y1="y"
                    :y2="y"
                    :x1="0"
                    :x2="viewPortSize.width"
                />
            </g>
            <ContactSVGRenderer
                v-for="contact of contacts"
                :key="contact.id"
                :contact="contact"
                :mapMode="mapMode"
                :zoom="zoom"
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
        zoom: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            viewPortSize: { height: 1000 / this.zoom, width: 1000 / this.zoom },
        };
    },
    components: {
        ContactSVGRenderer,
    },
    computed: {
        contacts() {
            return this.$store.getters.contactsRelativeToPlayer;
        },
        horizontalGridLines() {
            const playerY = Math.round(this.$store.getters.playerShip.pos.y);

            const lines = [];

            for (let y = 0; y < this.viewPortSize.height / this.zoom; y++) {
                if ((y + playerY) % 200 === 0) {
                    lines.push(y);
                }
            }
            return lines;
        },
        verticalGridLines() {
            const playerX = Math.round(this.$store.getters.playerShip.pos.x);

            const lines = [];

            for (let x = 0; x < this.viewPortSize.width / this.zoom; x++) {
                if ((x + playerX) % 200 === 0) {
                    lines.push(x);
                }
            }
            return lines;
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
