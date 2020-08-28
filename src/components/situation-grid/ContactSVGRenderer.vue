<template>
    <!-- Translate the entire group. That way the contents can be relative to a standard set of coordinates -->
    <g :transform="'translate(' + effectivePos.x + ' ' + effectivePos.y + ')'">
        <title>{{ tooltip }}</title>

        <!-- Sensor Radius -->
        <circle
            v-if="showSensorRadius"
            :r="sensorRange"
            :stroke="standardColor"
            :stroke-width="2"
            fill="transparent"
        />

        <!-- Heading indicator arrow -->
        <g :transform="`rotate(${contact.heading})`" trasform-origin="0 0" v-if="showHeading">
            <line
                :y1="-radius"
                :y2="-radius - throttleMagnitude - 3"
                :stroke-width="2"
                :stroke="standardColor"
            />
            <polygon
                points="-7,0 7,0 0,-7"
                :fill="standardColor"
                :transform="`translate(0 ${-radius - throttleMagnitude})`"
            />
            <line :y1="radius" :y2="radius + 5" :stroke-width="2" :stroke="standardColor" />
        </g>
        <!-- Heading Indicator -->
        <g
            v-if="showDesiredHeading"
            :transform="`rotate(${contact.desiredHeading})`"
            :stroke-width="2"
            :stroke="contactColor"
        >
            <line :y1="-radius" :y2="-radius - desiredThrottleMagnitude - 3" />
            <polygon
                points="-7,0 7,0 0,-7"
                :transform="`translate(0 ${-radius - desiredThrottleMagnitude})`"
            />
        </g>

        <!-- Navigational Path -->
        <line
            v-if="showNavPath"
            :id="'navPath-' + contact.id"
            :y1="0"
            :x1="0"
            :x2="navTarget.x"
            :y2="navTarget.y"
            :stroke="contactColor"
            stroke-width="2"
            opacity="0.5"
        />

        <!-- Aim Cone -->
        <path
            :d="arcData"
            v-if="showAimCone"
            :stroke="primaryColor"
            stroke-width="2"
            fill="transparent"
            opacity="0.5"
        />

        <!-- Current Aim -->
        <line
            v-if="showAimPoint"
            :id="'aimPoint-' + contact.id"
            :y1="-radius"
            :x1="0"
            :y2="-460"
            :x2="0"
            :transform="`rotate(${aimPointHeading})`"
            :stroke="primaryColor"
            stroke-width="2"
        />

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
        <circle :r="radius" :stroke="standardColor" :stroke-width="2" fill="transparent" />
        <!-- Legend -->
        <text
            v-if="showLegend"
            :y="radius + fontSize"
            :stroke="contactColor"
            text-anchor="middle"
            v-text="tooltip"
        />
    </g>
</template>

<script>
import VectorHelper from '../../logic/helpers/VectorHelper.js';
import SvgHelper from '../../logic/helpers/SvgHelper.js';
import ShipFormatter from '../../logic/helpers/ShipFormatter.js';
import MapMode from '../../logic/enums/MapMode.js';
import Classification from '../../logic/enums/Classification.js';
import ContactType from '../../logic/enums/ContactType.js';
import ContactSVGIcon from './ContactSVGIcon.vue';
import ShipService from '../../logic/services/ShipService.js';
import CombatService from '../../logic/services/CombatService.js';
import ColorLiterals from '../../logic/helpers/ColorLiterals.js';

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
        arcData() {
            return SvgHelper.describePieSlice(
                0,
                0,
                CombatService.weaponRange(this.contact),
                VectorHelper.clampDegrees(
                    this.contact.heading + CombatService.minAimPoint(this.contact)
                ),
                VectorHelper.clampDegrees(
                    this.contact.heading + CombatService.maxAimPoint(this.contact)
                )
            );
        },
        heading() {
            return this.contact.heading;
        },
        showNavPath() {
            if (!this.contact.navTarget) {
                return false;
            }

            switch (this.mapMode) {
                case MapMode.DEBUG:
                    return true;
                case MapMode.NAV:
                case MapMode.FLIGHTOPS:
                    return this.contact.classification === Classification.FRIENDLY;
                case MapMode.HELM:
                    return this.contact.isPlayer;
                default:
                    return false;
            }
        },
        navTarget() {
            if (!this.contact.navTarget) {
                return null;
            }
            return {
                x: this.contact.navTarget.x - this.contact.pos.x,
                y: this.contact.navTarget.y - this.contact.pos.y,
            };
        },
        showAimPoint() {
            switch (this.mapMode) {
                case MapMode.DEBUG:
                case MapMode.COMBAT:
                    return this.contact === this.$store.getters.playerShip;
                default:
                    return false;
            }
        },
        showAimCone() {
            switch (this.mapMode) {
                case MapMode.DEBUG:
                    return true;
                case MapMode.HELM:
                case MapMode.COMBAT:
                    return this.contact === this.$store.getters.playerShip;
                case MapMode.SITUATION:
                    return this.contact.isPlayer;
                default:
                    return false;
            }
        },
        aimPointHeading() {
            let heading = this.contact.heading;
            heading += this.$store.getters['combat/aimPoint'];
            return heading;
        },
        effectivePos() {
            return { x: this.contact.pos.x - this.offset.x, y: this.contact.pos.y - this.offset.y };
        },
        standardColor() {
            return ColorLiterals.text;
        },
        contactColor() {
            return ShipFormatter.calculateColorHex(this.contact);
        },
        primaryColor() {
            return ColorLiterals.primary;
        },
        radius() {
            return this.contact.size * this.zoom;
        },
        throttleMagnitude() {
            return VectorHelper.calculatePercentMagnitude(
                this.contact.throttle,
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
                case MapMode.NAV:
                    return this.contact.isPlayer || !ShipService.isMobile(this.contact);
                case MapMode.DEBUG:
                    return true;
                default:
                    return true;
            }
        },
        showSensorRadius() {
            switch (this.mapMode) {
                case MapMode.NAV:
                case MapMode.SENSORS:
                case MapMode.DEBUG:
                case MapMode.HELM:
                case MapMode.SITUATION:
                    return this.contact.isPlayer;
                default:
                    return false;
            }
        },
        sensorRange() {
            return ShipService.calculateSensorRange(this.contact);
        },
        isPlayer() {
            return this.contact.id === this.$store.getters.playerShip.id;
        },
        showDesiredHeading() {
            if (
                this.contact.heading === this.contact.desiredHeading &&
                this.contact.throttle === this.contact.desiredThrottle
            ) {
                return false;
            }

            switch (this.mapMode) {
                case MapMode.HELM:
                case MapMode.NAV:
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
                case MapMode.NAV: // TODO: Only within X units of player
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
