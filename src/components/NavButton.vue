<template>
    <router-link :to="to" class="button is-link" exact-active-class="is-light" exact>
        <slot />
    </router-link>
</template>

<script>
export default {
    name: 'NavButton',

    props: ['to'],
};
</script>
