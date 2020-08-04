<template>
    <header class="box has-background-info">
        <div>
            <strong class="has-text-dark">Vue Space Sim</strong>
            <cite
                >by <a href="https://www.twitter.com/IntegerMan" target="_new">Matt Eland</a></cite
            >
        </div>
        <div class="media-controls">
            <game-speed-control />
        </div>
    </header>
</template>

<script>
import GameSpeedControl from '@/components/GameSpeedControl.vue';

export default {
    name: 'NavHeader',
    components: {
        GameSpeedControl,
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

cite {
    margin-left: $m1;
    font-size: x-small;
    font-style: normal;

    a {
        font-weight: bold;
    }
}

header {
    display: flex;
    align-content: space-between;

    .media-controls {
        align-self: flex-end;
        margin-left: auto;
    }
}
</style>
