<template>
    <div class="shipIcon">
        <font-awesome-layers class="fa-2x">
            <font-awesome-icon :icon="['far', 'circle']" />
            <font-awesome-icon :icon="icon" :class="color" :transform="transform" />
            <font-awesome-layers-text :class="color" :value="text" transform="shrink-12 down-12" />
        </font-awesome-layers>
    </div>
</template>

<script>
export default {
    name: 'ShipIcon',
    props: {
        text: {
            type: String,
            default: 'UNKNOWN',
        },
        transform: {
            type: String,
            default: 'shrink-2',
        },
        color: {
            type: String,
            default: 'has-text-warning',
        },
        icon: {
            type: [String, Object],
            default: () => ['fas', 'angle-up'],
        },
    },
};
</script>

<style lang="scss" scoped>
.shipIcon {
    display: block;
    margin-bottom: 2rem;

    span {
        white-space: nowrap;
        text-transform: uppercase;
    }
}
</style>
