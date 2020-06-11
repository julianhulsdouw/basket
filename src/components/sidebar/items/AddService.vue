<template>
    <Tab
        identifier="mutenotifications"
        icon="static/icons/plus-solid.svg"
        :click="addService"
    />
</template>

<script>
    import { mapActions } from 'vuex';
    import Tab from '../tabs/Tab';

    export default {
        name: 'AddService',
        components: {
            Tab,
        },
        methods: {
            showAddModal() {
                // Add service to state / persist.
            },

            ...mapActions('services', ['addService']),
        },
    };
</script>
