<template>
    <!-- Translate the entire group. That way the contents can be relative to a standard set of coordinates -->
    <g :transform="'translate(' + contact.x + ' ' + contact.y + ')'">
        <title>{{ tooltip }}</title>

        <!-- Heading indicator arrow -->
        <g :transform="`rotate(${contact.heading})`" trasform-origin="0 0" v-if="showHeading">
            <line :y1="-radius" :y2="-radius - 10" :stroke-width="2" :stroke="stroke" />
            <polygon
                points="-7,0 7,0 0,-7"
                :fill="stroke"
                :transform="`translate(0 ${-radius - 7})`"
            />
            <line :y1="radius" :y2="radius + 5" :stroke-width="2" :stroke="stroke" />
        </g>
        <!-- Heading Indicator -->
        <g
            v-if="showDesiredHeading"
            :transform="`rotate(${contact.desiredHeading})`"
            :stroke-width="2"
            stroke-dasharray="1,1"
            :stroke="fill"
        >
            <line :y1="-radius" :y2="-radius - 10" />
            <polygon points="-7,0 7,0 0,-7" :transform="`translate(0 ${-radius - 7})`" />
        </g>
        <!-- Main iconography goes here -->
        <svg
            shape-rendering="auto"
            :width="radius * 4"
            :height="radius * 4"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMinYMin meet"
            :x="-radius * 2"
            :y="-radius * 2"
        >
            <ContactSVGIcon :contact="contact" :mapMode="mapMode" />
        </svg>
        <!-- The bounding circle -->
        <circle :r="radius" :stroke="stroke" :stroke-width="2" fill="transparent" />
        <!-- Legend -->
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
import ContactSVGIcon from '@/components/ContactSVGIcon.vue';

export default {
    name: 'ContactSVGRenderer',
    props: {
        contact: Object,
        mapMode: Number,
    },
    components: {
        ContactSVGIcon,
    },
    computed: {
        stroke() {
            return ShipFormatter.calculateStrokeHex(this.contact);
        },
        fill() {
            return ShipFormatter.calculateColorHex(this.contact);
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
        isPlayer() {
            return this.contact.id === this.$store.getters.playerShip.id;
        },
        showDesiredHeading() {
            if (this.contact.heading === this.contact.desiredHeading) return false;

            switch (this.mapMode) {
                case MapMode.HELM:
                    return this.isPlayer;
                case MapMode.DEBUG:
                    return true;
                case MapMode.SITUATION:
                    return this.isPlayer;
                case MapMode.FLIGHTOPS:
                    return this.contact.classification === Classification.FRIENDLY;
                default:
                    return false;
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
                    return this.contact.classification === Classification.FRIENDLY;
                default:
                    return false;
            }
        },
        fontSize() {
            return 20;
        },
        tooltip() {
            return `${this.contact.code} ${this.contact.name.toUpperCase()}`;
        },
    },
};
</script>
