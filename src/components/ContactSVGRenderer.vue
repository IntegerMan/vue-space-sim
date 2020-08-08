<template>
    <!-- Translate the entire group. That way the contents can be relative to a standard set of coordinates -->
    <g :transform="'translate(' + contact.x + ' ' + contact.y + ')'">
        <title>{{ tooltip }}</title>
        <!-- The bounding circle -->
        <circle :r="radius" :stroke="stroke" :stroke-width="2" fill="transparent" />
        <!-- Tooltip -->
        <text
            v-if="showLegend"
            :y="radius + 20"
            :stroke="fill"
            text-anchor="middle"
            v-text="tooltip"
        />
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
        fontSize() {
            return 20;
        },
        tooltip() {
            return `${this.contact.code} ${this.contact.name}`;
        },
    },
};
</script>
