<template>
    <!-- Translate the entire group. That way the contents can be relative to a standard set of coordinates -->
    <g :transform="'translate(' + contact.x + ' ' + contact.y + ')'">
        <title>{{ tooltip }}</title>
        <!-- The bounding circle -->
        <circle :r="radius" :stroke="stroke" :stroke-width="2" fill="transparent" />
        <!-- Heading indicator arrow -->
        <g :transform="`rotate(${contact.heading})`" trasform-origin="0 0" v-if="showHeading">
            <line
                :x1="0"
                :x2="0"
                :y1="-radius"
                :y2="-radius - 10"
                :stroke-width="2"
                :stroke="stroke"
            />
            <polygon
                points="-7,0 7,0 0,-7"
                :fill="stroke"
                :transform="`translate(0 ${-radius - 7})`"
            />
            <line :x1="0" :x2="0" :y1="radius" :y2="radius + 5" :stroke-width="2" :stroke="stroke" />
        </g>
        <!-- Tooltip -->
        <text
            v-if="showLegend"
            :y="radius + fontSize"
            :stroke="fill"
            text-anchor="middle"
            v-text="tooltip"
        />
    </g>
</template>

<script>
import ShipFormatter from '@/helpers/ShipFormatter.js';
import MapMode from '@/enums/MapMode.js';
import Classification from '@/enums/Classification.js';

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
            switch (this.mapMode) {
                case MapMode.HELM:
                    return this.contact.isPlayer;
                case MapMode.DEBUG:
                    return true;
                default:
                    return true;
            }
        },
        showHeading() {
            switch (this.mapMode) {
                case MapMode.HELM: // TODO: Only within X units of player
                case MapMode.DEBUG:
                    return true;
                case MapMode.SITUATION:
                    return this.contact.isPlayer;
                case MapMode.COMBAT:
                    return true;
                case MapMode.FLIGHTOPS:
                    return (
                        this.contact.classification === Classification.FRIENDLY
                    );
                default:
                    return false;
            }
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
