<template>
    <div id="app">
        <nav-header />
        <main class="box has-background-dark">
            <router-view />
        </main>
        <aside class="box has-background-primary">
            <nav-sidebar />
        </aside>
        <footer class="box has-background-info">
            <router-view name="footer" />
        </footer>
    </div>
</template>

<script>
import NavSidebar from '@/components/NavSidebar.vue';
import NavHeader from '@/components/NavHeader.vue';

export default {
    name: 'App',
    components: {
        NavHeader,
        NavSidebar,
    },
    created() {
        this.$store.dispatch('startGame');
    },
};
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/bulma.scss';

html {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    background-color: $bgColor;
    color: $panelTextColor;
}

html {
    overflow-y: hidden;
}

#app {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    padding: $m1;

    display: grid;
    grid-template-areas:
        'header header'
        'sideNav main'
        'footer footer';

    column-gap: $m1;

    grid-template-rows: auto 1fr 8rem;
    grid-template-columns: auto 1fr;

    > aside {
        grid-area: sideNav;
        margin-bottom: $m1;
    }

    > header {
        grid-area: header;
        margin-bottom: $m1;
    }

    > footer {
        grid-area: footer;
    }

    > main {
        grid-area: main;
        margin-bottom: $m1;
        overflow: auto;
    }
}

.vertical-display {
    display: flex;
    flex-direction: column;
    align-content: space-evenly;
    justify-content: flex-start;
    flex-wrap: wrap;
    row-gap: 0.5rem;
    column-gap: 0.5rem;

    button {
        margin-top: $m1;
    }
}

.status-indicators {
    justify-items: flex-start;
    align-items: flex-start;
}

.footer-control {
    display: flex;
    justify-content: space-around;
    height: 100%;

    > .control {
        display: flex;
        align-items: center;
    }

    label {
        margin-right: $m1;
    }
}

// Scrollbar Styling
::-webkit-scrollbar {
    width: $m2;
}
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0.25rem $background;
}
::-webkit-scrollbar-thumb {
    background: $primary;
    border-radius: 0.25rem;
}
::-webkit-scrollbar-thumb:hover {
    background: $link;
}
</style>
