<template>
    <Tab
        identifier="mutenotifications"
        :icon="icon"
        :click="toggleNotifications"
    />
</template>

<script>
    import { mapActions } from 'vuex';
    import Tab from '@/components/sidebar/tabs/Tab';

    export default {
        name: 'MuteNotifications',
        components: {
            Tab,
        },
        computed: {
            icon() {
                return this.$store.state.settings.notificationsMuted
                    ? 'static/icons/notifications_off-black-18dp.svg'
                    : 'static/icons/notifications-white-18dp.svg';
            },
        },
        methods: {
            ...mapActions('settings', ['toggleNotifications']),
        },
    };
</script>
