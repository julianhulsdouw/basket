<template>
    <Tab
        :active="service.visible"
        :disabled="!service.enabled"
        :identifier="service.identifier"
        :icon="service.icon"
        :click="showService"
        :context-menu="showContextMenu"
        :notification-count="service.notificationCount"
    />
</template>

<script>
    import { mapActions } from 'vuex';
    import Tab from '../tabs/Tab';
    import ContextMenu from '../../../library/menu/serviceContext';
    import GetWebview from '../../../library/webview';

    const electron = require('electron');

    const { Menu } = electron.remote;

    export default {
        name: 'Service',
        components: {
            Tab,
        },
        props: {
            service: {
                required: true,
                type: Object,
            },
        },
        computed: {
            showContextMenu() {
                return Menu.buildFromTemplate(
                    new ContextMenu(this.$store, this.service),
                );
            },
        },
        methods: {
            async showService() {
                await this.hidePreferences();

                this.setActive(this.service.identifier);

                const webview = GetWebview(this.service.identifier);

                if (document.activeElement) {
                    document.activeElement.blur();
                }

                webview.focus();
            },

            ...mapActions('services', ['setActive']),

            ...mapActions('settings', ['hidePreferences']),
        },
    };
</script>
