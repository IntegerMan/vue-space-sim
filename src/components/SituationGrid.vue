<template>
    <div class="situation-grid has-background-black">
        <svg
            width="100%"
            :viewBox="'0 0 ' + viewPortSize.width + ' ' + viewPortSize.height"
            preserveAspectRatio="xMinYMin meet"
            shape-rendering="auto"
            @click="handleClick($event)"
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
                :offset="offset"
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
        centerOnPlayer: {
            type: Boolean,
            default: true,
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
        sector() {
            return this.$store.getters['galaxy/currentSector'];
        },
        offset() {
            if (this.centerOnPlayer) {
                const playerPos = this.$store.getters.playerShip.pos;

                return {
                    x: Math.round(playerPos.x - this.viewPortSize.width / 2),
                    y: Math.round(playerPos.y - this.viewPortSize.height / 2),
                };
            } else {
                return { x: 0, y: 0 };
            }
        },
        horizontalGridLines() {
            const lines = [];

            for (let y = 0; y <= Math.max(this.sector.size.y, this.viewPortSize.height); y++) {
                if (Math.round(y) % this.gridSize === 0) {
                    lines.push(Math.round(y - this.offset.y));
                }
            }
            return lines;
        },
        verticalGridLines() {
            const lines = [];

            for (let x = 0; x <= Math.max(this.sector.size.x, this.viewPortSize.width); x++) {
                if (Math.round(x) % this.gridSize === 0) {
                    lines.push(Math.round(x - this.offset.x));
                }
            }
            return lines;
        },
        lineStroke() {
            return ColorLiterals.text;
        },
        gridSize() {
            return 250;
        },
    },
    methods: {
        calculateColorHex(contact) {
            return ShipFormatter.calculateColorHex(contact);
        },
        handleClick(event) {
            let target = event.target;
            while (target && !target.width) {
                target = target.ownerSVGElement;
            }

            if (target) {
                const offset = this.offset;
                const viewport = this.viewPortSize;

                const width = target.width.baseVal.value;
                const height = target.height.baseVal.value;

                const x = Math.round((event.offsetX / width) * viewport.width) + offset.x;
                const y = Math.round((event.offsetY / height) * viewport.height) + offset.y;

                this.$emit('LocationClick', { x, y });
            }
        },
    },
};
</script>

<style lang="scss">
.situation-grid {
    width: 28rem;
}
</style>
