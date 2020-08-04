<template>
    <nav role="navigation">
        <nav-button class="is-fullwidth" :to="{ name: 'Situation' }">Situation</nav-button>
        <nav-button class="is-fullwidth" :to="{ name: 'Nav' }">Navigation</nav-button>
        <nav-button class="is-fullwidth" :to="{ name: 'Tactical' }">Tactical</nav-button>
        <nav-button class="is-fullwidth" :to="{ name: 'Flight' }">Flight Ops</nav-button>
        <nav-button class="is-fullwidth" :to="{ name: 'Engineering' }">Engineering</nav-button>
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
