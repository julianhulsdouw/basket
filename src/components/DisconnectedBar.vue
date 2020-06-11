<template>
    <div class="bar" v-if="status === false">
        <span>Not connected to the internet.</span>
    </div>
</template>

<script>
    const isOnline = require('is-online');

    export default {
        name: 'DisconnectedBar',
        data: () => ({
            status: true,
        }),
        async mounted() {
            this.status = await isOnline();

            // Check if there is an internet connection every 30
            // seconds to, otherwise show warning.
            setInterval(async () => {
                this.status = await isOnline();
            }, 30000);
        },
    };
</script>
<style lang="scss" scoped>
    .bar {
        width: 100%;
        height: 25px;
        background-color: $selective-yellow;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
