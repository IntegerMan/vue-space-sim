<template>
    <div class="card has-text-info has-background-light mt-2">
        <div class="card-content">
            <p class="title">
                {{ titleText }}
            </p>
            <p class="subtitle has-text-info">
                {{ subtitleText }}
            </p>
            <span>Health: {{ healthPercent }}</span>
            <progress
                class="progress is-success"
                :value="component.health"
                :max="component.maxHealth"
                >{{ healthPercent }}</progress
            >
        </div>
    </div>
</template>

<script>
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
            return this.component.type;
        },
        subtitleText() {
            return this.component.type;
        },
    },
};
</script>
