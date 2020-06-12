<template>
    <div class="bar" v-if="status === false">
        <span>{{ $t('internet_disconnected') }}</span>
    </div>
</template>

<script>
    const isOnline = require('is-online');

    export default {
        name: 'DisconnectedBar',
        data() {
            return {
                status: true,
            };
        },
        async mounted() {
            this.status = await isOnline();

            // Check if there is an internet connection every
            // 30 seconds, otherwise show warning.
            setInterval(async () => {
                this.status = await isOnline();
            }, 30000);
        },
    };
</script>
<style lang="scss" scoped>
    .bar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 25px;
        background-color: $selective-yellow;
    }
</style>
