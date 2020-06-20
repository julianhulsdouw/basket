<template>
    <Tab identifier="mutesound" :icon="icon" :click="toggleSoundAndMute" />
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import Tab from '../tabs/Tab';
    import GetWebview from '../../../library/webview';

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
            toggleSoundAndMute() {
                this.toggleSound();

                const services = this.allServices();
                if (services.length) {
                    const allSoundMuted = this.getSoundMuted();

                    services.forEach((service) => {
                        const webview = GetWebview(service.identifier);

                        // When toggling all all sound make sure all webviews get muted/unmuted
                        // or return the value to the specific service setting
                        webview.setAudioMuted(
                            !service.soundEnabled || allSoundMuted,
                        );
                    });
                }
            },

            ...mapActions('settings', ['toggleSound']),

            ...mapGetters('settings', ['getSoundMuted']),

            ...mapGetters('services', ['allServices']),
        },
    };
</script>
