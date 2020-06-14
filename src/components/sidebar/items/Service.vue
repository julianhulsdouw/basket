<template>
    <Tab
        :active="service.visible"
        :disabled="!service.enabled"
        :identifier="service.identifier"
        :icon="service.icon"
        :click="showService"
        :context-menu="showContextMenu"
    />
</template>

<script>
    import { mapActions } from 'vuex';
    import Tab from '../tabs/Tab';
    import ContextMenu from '../../../library/menu/serviceContext';

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
        methods: {
            showContextMenu() {
                return Menu.buildFromTemplate(
                    new ContextMenu(this.$store, this.service),
                ).popup();
            },

            showService() {
                this.setActive(this.service.identifier);
            },

            ...mapActions('services', ['setActive']),
        },
    };
</script>
