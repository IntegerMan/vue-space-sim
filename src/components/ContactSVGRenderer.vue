<template>
    <g>
        <title>{{ tooltip }}</title>
        <circle
            :cx="contact.x"
            :cy="contact.y"
            :r="radius"
            :stroke="stroke"
            :stroke-width="2"
            fill="transparent"
        />
        <text
            v-if="showLegend"
            :x="contact.x"
            :y="contact.y + radius + 20"
            :stroke="fill"
            text-anchor="middle"
            >{{ tooltip }}</text
        >
    </g>
</template>

<script>
import ShipFormatter from '@/helpers/ShipFormatter.js';
import MapMode from '@/enums/MapMode.js';

export default {
    name: 'ContactSVGRenderer',
    props: {
        contact: Object,
        mapMode: Number,
    },
    computed: {
        stroke() {
            return ShipFormatter.calculateStrokeHex(this.contact);
        },
        fill() {
            return ShipFormatter.calculateColorHex(this.contact);
        },
        textClass() {
            return ShipFormatter.calculateColorClass(this.contact);
        },
        radius() {
            return this.contact.size;
        },
        showLegend() {
            return this.mapMode !== MapMode.HELM || this.contact.isPlayer;
        },
        tooltip() {
            return `${this.contact.code} ${this.contact.name}`;
        },
    },
};
</script>
