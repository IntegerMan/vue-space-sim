<template>
    <div class="buttons has-addons are-small">
        <button
            class="button"
            :class="{ 'is-warning': isPaused, 'is-dark': !isPaused }"
            title="Pause"
            @click="pause()"
        >
            <span class="icon is-small">
                <font-awesome-icon icon="pause"></font-awesome-icon>
            </span>
        </button>
        <button class="button is-dark" title="Advance One" @click="advanceOne()">
            <span class="icon is-small">
                <font-awesome-icon icon="step-forward"></font-awesome-icon>
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
            timeout: null,
        };
    },
    computed: {
        isPaused() {
            return this.$store.state.simulation.speed === 0;
        },
        isPlaying() {
            return this.$store.state.simulation.speed === 1;
        },
        isFastForward() {
            return this.$store.state.simulation.speed === 2;
        },
    },
    methods: {
        clearTimer() {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
        },
        setTimer() {
            if (this.isPaused) {
                this.clearTimer();
            } else {
                const ticks = this.isFastForward ? 150 : 500;
                this.timeout = setTimeout(this.onTimerTick, ticks);
            }
        },
        advanceOne() {
            this.clearTimer();
            this.$store.dispatch('simulation/advanceOne');
        },
        onTimerTick() {
            this.$store.dispatch('simulation/advance');
            this.setTimer();
        },
        pause() {
            this.clearTimer();
            this.$store.dispatch('simulation/pause');
        },
        play() {
            this.$store.dispatch('simulation/play');
            this.setTimer();
        },
        fastForward() {
            this.$store.dispatch('simulation/fastForward');
            this.setTimer();
        },
    },
};
</script>
