<template>
    <!-- Translate the entire group. That way the contents can be relative to a standard set of coordinates -->
    <g :transform="'translate(' + effectivePos.x + ' ' + effectivePos.y + ')'">
        <title>{{ tooltip }}</title>

        <!-- Heading indicator arrow -->
        <g :transform="`rotate(${contact.heading})`" trasform-origin="0 0" v-if="showHeading">
            <line
                :y1="-radius"
                :y2="-radius - throttleMagnitude - 3"
                :stroke-width="2"
                :stroke="stroke"
            />
            <polygon
                points="-7,0 7,0 0,-7"
                :fill="stroke"
                :transform="`translate(0 ${-radius - throttleMagnitude})`"
            />
            <line :y1="radius" :y2="radius + 5" :stroke-width="2" :stroke="stroke" />
        </g>
        <!-- Heading Indicator -->
        <g
            v-if="showDesiredHeading"
            :transform="`rotate(${contact.desiredHeading})`"
            :stroke-width="2"
            :stroke="fill"
        >
            <line :y1="-radius" :y2="-radius - desiredThrottleMagnitude - 3" />
            <polygon
                points="-7,0 7,0 0,-7"
                :transform="`translate(0 ${-radius - desiredThrottleMagnitude})`"
            />
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
import VectorHelper from '../helpers/VectorHelper.js';
import ShipFormatter from '../helpers/ShipFormatter.js';
import MapMode from '../enums/MapMode.js';
import Classification from '../enums/Classification.js';
import ContactType from '../enums/ContactType.js';
import ContactSVGIcon from '../components/ContactSVGIcon.vue';

export default {
    name: 'ContactSVGRenderer',
    props: {
        contact: Object,
        mapMode: Number,
        zoom: {
            type: Number,
            default: 1,
        },
        offset: {
            type: Object,
            default: () => ({ x: 0, y: 0 }),
        },
    },
    components: {
        ContactSVGIcon,
    },
    computed: {
        effectivePos() {
            return { x: this.contact.pos.x - this.offset.x, y: this.contact.pos.y - this.offset.y };
        },
        stroke() {
            return ShipFormatter.calculateStrokeHex(this.contact);
        },
        fill() {
            return ShipFormatter.calculateColorHex(this.contact);
        },
        radius() {
            return this.contact.size * this.zoom;
        },
        throttleMagnitude() {
            return VectorHelper.calculatePercentMagnitude(
                this.contact.thrust,
                3 * this.zoom,
                50 * this.zoom
            );
        },
        desiredThrottleMagnitude() {
            return VectorHelper.calculatePercentMagnitude(
                this.contact.desiredThrottle,
                3 * this.zoom,
                50 * this.zoom
            );
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
            if (
                this.contact.heading === this.contact.desiredHeading &&
                this.contact.thrust === this.contact.desiredThrottle
            ) {
                return false;
            }

            switch (this.mapMode) {
                case MapMode.HELM:
                case MapMode.COMBAT:
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
            if (
                this.contact.contactType === ContactType.STATION ||
                this.contact.contactType === ContactType.JUMP_POINT
            ) {
                return false;
            }

            switch (this.mapMode) {
                case MapMode.HELM: // TODO: Only within X units of player
                case MapMode.DEBUG:
                    return true;
                case MapMode.SITUATION:
                case MapMode.COMBAT:
                    return this.contact.isPlayer;
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
