<template>
    <svg width="48" height="48" viewBox="0 0 500 515" x="26" y="26">
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
