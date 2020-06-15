<template>
    <Tab identifier="mutesound" :icon="icon" :click="toggleSound" />
</template>

<script>
    import { mapActions } from 'vuex';
    import Tab from '@/components/sidebar/tabs/Tab';

    export default {
        name: 'MuteSound',
        components: {
            Tab,
        },
        computed: {
            icon() {
                return this.$store.state.settings.soundMuted
                    ? 'static/icons/volume_off-black-18dp.svg'
                    : 'static/icons/volume_up-white-18dp.svg';
            },
        },
        methods: {
            ...mapActions('settings', ['toggleSound']),
        },
    };
</script>
