<template>
    <svg width="45" height="45" viewBox="0 0 575 515" x="27" y="27">
        <path :d="pathData" :fill="fill" />
    </svg>
</template>

<script>
export default {
    name: 'FontAwesomeSVGRenderer',
    props: {
        pathData: String,
        fill: String,
    },
};
</script>
