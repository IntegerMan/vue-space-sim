<template>
    <g>
        <circle :r="radius" :fill="fill" :cx="contact.x" :cy="contact.y" stroke-width="0">
            <title>{{ tooltip }}</title>
        </circle>
    </g>
</template>

<script>
import ShipFormatter from '@/helpers/ShipFormatter.js';

export default {
    name: 'ContactSVGRenderer',
    props: {
        contact: Object,
    },
    computed: {
        fill() {
            return ShipFormatter.calculateColorHex(this.contact);
        },
        radius() {
            return 15; // TODO: Read from the contact
        },
        tooltip() {
            return `${this.contact.code} ${this.contact.name}`;
        },
    },
};
</script>
