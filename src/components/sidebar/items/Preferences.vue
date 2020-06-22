<template>
    <Tab
        identifier="preferences"
        icon="static/icons/settings-black-18dp.svg"
        :click="clickHandler"
    />
</template>

<script>
    import { mapActions } from 'vuex';
    import Tab from '../tabs/Tab';

    export default {
        name: 'Preferences',
        components: {
            Tab,
        },
        methods: {
            async clickHandler() {
                await this.hideAllServices();

                this.showPreferences();

                if (document.activeElement) {
                    document.activeElement.blur();
                }
            },

            ...mapActions('services', ['hideAllServices']),
            ...mapActions('settings', ['showPreferences']),
        },
    };
</script>
