<template>
    <div class="field has-addons has-text-dark">
        <p class="control">
            <button class="button">
                <span class="icon is-small">
                    <font-awesome-icon icon="fa-pause"></font-awesome-icon>
                </span>
            </button>
        </p>
        <p class="control">
            <button class="button">
                <span class="icon is-small">
                    <font-awesome-icon icon="fa-play"></font-awesome-icon>
                </span>
            </button>
        </p>
        <p class="control">
            <button class="button">
                <span class="icon is-small">
                    <font-awesome-icon icon="fa-forward"></font-awesome-icon>
                </span>
            </button>
        </p>
    </div>
</template>

<script>
export default {
    name: 'GameSpeedControl',
};
</script>