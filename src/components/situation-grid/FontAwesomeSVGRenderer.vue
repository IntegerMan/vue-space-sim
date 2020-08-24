<template>
    <svg
        width="40"
        height="40"
        style="margin: auto;"
        :viewBox="'0 0 ' + viewBoxWidth + ' ' + viewBoxHeight"
        x="30"
        y="30"
    >
        <path :d="pathData" :fill="fill" />
    </svg>
</template>

<script>
export default {
    name: 'FontAwesomeSVGRenderer',
    props: {
        pathData: String,
        fill: String,
        viewBoxWidth: {
            type: Number,
            default: 575,
        },
        viewBoxHeight: {
            type: Number,
            default: 500,
        },
    },
};
</script>
