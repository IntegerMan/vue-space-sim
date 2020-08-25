<template>
    <div class="situation-grid has-background-black">
        <svg
            width="100%"
            :viewBox="'0 0 ' + viewPortSize.width + ' ' + viewPortSize.height"
            preserveAspectRatio="xMinYMin meet"
            shape-rendering="auto"
            @click.prevent="handleClick($event)"
        >
            <grid-line-generator :offset="offset" :viewPortSize="viewPortSize" />

            <g v-if="hazards.length" id="hazards">
                <circle
                    v-for="hazard of hazards"
                    :key="hazard.pos.x + ',' + hazard.pos.y"
                    :r="hazard.size"
                    :cx="hazard.pos.x - offset.x"
                    :cy="hazard.pos.y - offset.y"
                    fill="#9932CC"
                    opacity="0.35"
                />
            </g>

            <!-- Render actual contacts -->
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
import GridLineGenerator from './GridLineGenerator.vue';
import ContactSVGRenderer from './ContactSVGRenderer.vue';
import ShipFormatter from '../../logic/helpers/ShipFormatter.js';

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
        contacts: {
            type: Array,
            required: true,
        },
        hazards: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            viewPortSize: { height: 1000 / this.zoom, width: 1000 / this.zoom },
        };
    },
    components: {
        ContactSVGRenderer,
        GridLineGenerator,
    },
    computed: {
        playerPos() {
            const playerPos = this.$store.getters.playerShip.pos;
            return { x: playerPos.x - this.offset.x, y: playerPos.y - this.offset.y };
        },
        sector() {
            return this.$store.getters.currentSector;
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
