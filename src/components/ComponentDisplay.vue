<template>
    <div class="card has-text-info mt-2 has-background-light">
        <header class="card-header">
            <p class="card-header-title">
                {{ titleText }}
            </p>
            <a
                v-if="isTogglable"
                @click.prevent="toggleStatus()"
                title="Toggle Component Power"
                href="#"
                class="card-header-icon"
                aria-label="more options"
            >
                <div class="tags has-addons">
                    <span class="tag is-dark">Status</span>
                    <span v-if="isOn" class="tag is-success has-text-weight-bold">ON</span>
                    <span v-if="isOff" class="tag is-danger has-text-weight-bold">OFF</span>
                </div>
            </a>
        </header>
        <div class="card-content">
            <p class="has-text-info">
                {{ subtitleText }}
            </p>
            <div class="card-section">
                <span>Health: {{ healthPercent }}</span>
                <progress
                    class="progress"
                    :class="{
                        'is-success': isOn || !isTogglable,
                        'is-dark': isOff,
                    }"
                    :value="component.health"
                    :max="component.maxHealth"
                    >{{ healthPercent }}</progress
                >
            </div>
        </div>
    </div>
</template>

<script>
import ComponentService from '../services/ComponentService.js';

export default {
    props: {
        component: {
            type: Object,
            required: true,
        },
    },
    computed: {
        healthPercent() {
            return Math.floor((this.component.health / this.component.maxHealth) * 100) + ' %';
        },
        titleText() {
            return ComponentService.getTitle(this.component);
        },
        subtitleText() {
            return ComponentService.getSubtitle(this.component);
        },
        isTogglable() {
            return this.isOn || this.isOff;
        },
        isOn() {
            return this.component.isOn === true;
        },
        isOff() {
            return this.component.isOn === false;
        },
    },
    methods: {
        toggleStatus() {
            const payload = {
                contactId: this.$store.getters.playerShip.id,
                component: this.component,
            };
            this.$store.dispatch('toggleComponent', payload);
        },
    },
};
</script>

<style lang="scss" scoped>
.card-section {
    margin-top: 1rem;
}
</style>
