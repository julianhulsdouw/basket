<template>
    <Tab
        identifier="mutenotifications"
        icon="static/icons/plus-solid.svg"
        :click="addServiceHandler"
    />
</template>

<script>
    import { mapActions } from 'vuex';
    import Tab from '../tabs/Tab';
    import AppMenu from '../../../library/menu/main';

    export default {
        name: 'AddService',
        components: {
            Tab,
        },
        methods: {
            showAddModal() {
                // Add service to state / persist.
            },

            addServiceHandler() {
                this.addService();

                new AppMenu(this.$store); // eslint-disable-line no-new
            },

            ...mapActions('services', ['addService']),
        },
    };
</script>
