<template>
    <nav class="navbar is-info" role="navigation">
        <div class="navbar-brand">
            <div class="navbar-item">Vue Space Sim</div>
        </div>
        <div class="navbar-item">
            <game-speed-control />
        </div>
    </nav>
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