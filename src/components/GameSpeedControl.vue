<template>
    <div class="buttons has-addons are-small">
        <button
            class="button"
            :class="{ 'is-success': isPaused, 'is-dark': !isPaused }"
            title="Pause"
            @click="pause()"
        >
            <span class="icon is-small">
                <font-awesome-icon icon="pause"></font-awesome-icon>
            </span>
        </button>
        <button
            class="button"
            :class="{ 'is-success': isPlaying, 'is-dark': !isPlaying }"
            title="Play"
            @click="play()"
        >
            <span class="icon is-small">
                <font-awesome-icon icon="play"></font-awesome-icon>
            </span>
        </button>
        <button
            class="button"
            :class="{ 'is-success': isFastForward, 'is-dark': !isFastForward }"
            title="Fast Forward"
            @click="fastForward()"
        >
            <span class="icon is-small">
                <font-awesome-icon icon="forward"></font-awesome-icon>
            </span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'GameSpeedControl',
    data() {
        return {
            mediaState: 1,
        };
    },
    computed: {
        isPaused() {
            return this.mediaState === 0;
        },
        isPlaying() {
            return this.mediaState === 1;
        },
        isFastForward() {
            return this.mediaState === 2;
        },
    },
    methods: {
        pause() {
            this.mediaState = 0;
        },
        play() {
            this.mediaState = 1;
        },
        fastForward() {
            this.mediaState = 2;
        },
    },
};
</script>
