<template>
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
</template>

<script>
import ColorLiterals from '../../logic/helpers/ColorLiterals.js';

export default {
    props: {
        offset: {
            type: Object,
            required: true,
        },
        viewPortSize: {
            type: Object,
            required: true,
        },
        gridSize: {
            type: Number,
            default: 1000,
        },
    },
    computed: {
        sector() {
            return this.$store.getters.currentSector;
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
    },
};
</script>

<style></style>
