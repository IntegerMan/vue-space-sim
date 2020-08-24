<template>
    <!-- Translate the entire group. That way the contents can be relative to a standard set of coordinates -->
    <g>
        <!--<circle fill="red" :r="25" :cx="50" :cy="50" />-->
        <line
            v-if="showCapshipLine"
            :x1="25"
            :x2="75"
            :y1="50"
            :y2="50"
            :stroke="stroke"
            :stroke-width="3"
        />
        <g v-if="showRaptorDots">
            <circle :fill="fill" :r="5" :cx="42" :cy="50" />
            <circle :fill="fill" :r="5" :cx="58" :cy="50" />
        </g>
        <g v-else-if="showCarrierLines">
            <polyline points="35,62 50,32 65,62" :stroke="fill" :stroke-width="7" fill="none" />
        </g>
        <g v-else>
            <FontAwesomeSVGRenderer :pathData="pathData" :fill="fill" :viewBoxWidth="iconWidth" />
        </g>
    </g>
</template>

<script>
import ShipFormatter from '../logic/helpers/ShipFormatter.js';
import ContactType from '../logic/enums/ContactType.js';
import FontAwesomeSVGRenderer from '../components/FontAwesomeSVGRenderer.vue';

export default {
    name: 'ContactSVGIcon',
    props: {
        contact: Object,
        mapMode: Number,
    },
    components: {
        FontAwesomeSVGRenderer,
    },
    computed: {
        stroke() {
            return ShipFormatter.calculateStrokeHex(this.contact);
        },
        fill() {
            return ShipFormatter.calculateColorHex(this.contact);
        },
        showCapshipLine() {
            switch (this.contact.contactType) {
                case ContactType.DESTROYER:
                case ContactType.CRUISER:
                case ContactType.CARRIER:
                case ContactType.DREADNAUGHT:
                    return true;
                default:
                    return false;
            }
        },
        showCarrierLines() {
            return this.contact.contactType === ContactType.CARRIER;
        },
        showRaptorDots() {
            return this.contact.contactType === ContactType.LIGHT;
        },
        pathData() {
            switch (this.contact.contactType) {
                case ContactType.RADIOLOGICAL:
                    return 'M328.2 255.8h151.6c9.1 0 16.8-7.7 16.2-16.8-5.1-75.8-44.4-142.2-102.5-184.2-7.4-5.3-17.9-2.9-22.7 4.8L290.4 188c22.6 14.3 37.8 39.2 37.8 67.8zm-37.8 67.7c-12.3 7.7-26.8 12.4-42.4 12.4-15.6 0-30-4.7-42.4-12.4L125.2 452c-4.8 7.7-2.4 18.1 5.6 22.4C165.7 493.2 205.6 504 248 504s82.3-10.8 117.2-29.6c8-4.3 10.4-14.8 5.6-22.4l-80.4-128.5zM248 303.8c26.5 0 48-21.5 48-48s-21.5-48-48-48-48 21.5-48 48 21.5 48 48 48zm-231.8-48h151.6c0-28.6 15.2-53.5 37.8-67.7L125.2 59.7c-4.8-7.7-15.3-10.2-22.7-4.8C44.4 96.9 5.1 163.3 0 239.1c-.6 9 7.1 16.7 16.2 16.7z';
                case ContactType.PIRATE:
                    return 'M439.15 453.06L297.17 384l141.99-69.06c7.9-3.95 11.11-13.56 7.15-21.46L432 264.85c-3.95-7.9-13.56-11.11-21.47-7.16L224 348.41 37.47 257.69c-7.9-3.95-17.51-.75-21.47 7.16L1.69 293.48c-3.95 7.9-.75 17.51 7.15 21.46L150.83 384 8.85 453.06c-7.9 3.95-11.11 13.56-7.15 21.47l14.31 28.63c3.95 7.9 13.56 11.11 21.47 7.15L224 419.59l186.53 90.72c7.9 3.95 17.51.75 21.47-7.15l14.31-28.63c3.95-7.91.74-17.52-7.16-21.47zM150 237.28l-5.48 25.87c-2.67 12.62 5.42 24.85 16.45 24.85h126.08c11.03 0 19.12-12.23 16.45-24.85l-5.5-25.87c41.78-22.41 70-62.75 70-109.28C368 57.31 303.53 0 224 0S80 57.31 80 128c0 46.53 28.22 86.87 70 109.28zM280 112c17.65 0 32 14.35 32 32s-14.35 32-32 32-32-14.35-32-32 14.35-32 32-32zm-112 0c17.65 0 32 14.35 32 32s-14.35 32-32 32-32-14.35-32-32 14.35-32 32-32z';
                case ContactType.JUMP_POINT:
                    return 'M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm231-113.9L103.5 277.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L256 226.9l101.6 101.6c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L273 142.1c-9.4-9.4-24.6-9.4-34 0z';
                case ContactType.FREIGHTER:
                    return 'M144 256h352c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16H384v128l-64-32-64 32V0H144c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16zm480 128c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h48v64H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h608c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-48v-64h48zm-336 64H128v-64h160v64zm224 0H352v-64h160v64z';
                case ContactType.STATION:
                    return 'M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z';
                // TODO: Support JUMP_POINT
                // TODO: Support CRUISER
                // TODO: Support DESTROYER
                // TODO: Support FIGHTER
                // TODO: Support MISSILE
                // TODO: Support FREIGHTER
                default:
                    console.warn('Unknown contact type', this.contact.contactType);
                    return 'M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z';
            }
        },
        iconWidth() {
            switch (this.contact.contactType) {
                case ContactType.STATION:
                    return 380;
                case ContactType.PIRATE:
                    return 425;
                case ContactType.FREIGHTER:
                    return 650;
                case ContactType.JUMP_POINT:
                    return 500;
                default:
                    return 550;
            }
        },
    },
};
</script>
