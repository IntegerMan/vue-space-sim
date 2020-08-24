<template>
    <div class="control">
        <div class="tags has-addons">
            <span class="tag tag-label is-dark">{{ label }}</span>
            <span class="tag tag-status is-success" v-if="isReady">Ready</span>
            <span class="tag tag-status is-danger" v-if="isOffline">Offline</span>
        </div>
    </div>
</template>

<script>
import ComponentService from '../logic/services/ComponentService.js';

export default {
    props: {
        type: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        owner: {
            type: Object,
            required: true,
        },
    },
    computed: {
        isReady() {
            return (
                ComponentService.getActiveComponentsOfType(this.owner.components, this.type)
                    .length > 0
            );
        },
        isOffline() {
            return (
                ComponentService.getActiveComponentsOfType(this.owner.components, this.type)
                    .length <= 0
            );
        },
    },
};
</script>

<style lang="scss">
.tag-label {
    width: 5rem;
}
.tag-status {
    width: 4rem;
    font-weight: bold;
    text-transform: uppercase;
}
</style>
