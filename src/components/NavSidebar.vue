<template>
    <nav role="navigation">
        <nav-button class="is-fullwidth" :to="{ name: 'Situation' }">Situation</nav-button>
        <nav-button class="is-fullwidth" :to="{ name: 'Helm' }">Helm</nav-button>
        <nav-button class="is-fullwidth" :to="{ name: 'Combat' }">Combat</nav-button>
        <nav-button class="is-fullwidth" :to="{ name: 'Nav' }">Navigation</nav-button>
        <nav-button class="is-fullwidth" :to="{ name: 'Operations' }">Operations</nav-button>
        <nav-button class="is-fullwidth" :to="{ name: 'Flight' }">Flight</nav-button>
        <nav-button class="is-fullwidth" :to="{ name: 'Sensors' }">Sensors</nav-button>
        <nav-button class="is-fullwidth" :to="{ name: 'Debug' }">Debug View</nav-button>
    </nav>
</template>

<script>
import NavButton from './NavButton.vue';

export default {
    name: 'NavSidebar',
    components: { NavButton },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

a {
    display: block;
    margin-bottom: $m1;
}
</style>
