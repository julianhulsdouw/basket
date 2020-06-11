<template>
    <Tab
        :active="service.visible"
        :identifier="service.identifier"
        :icon="service.icon"
        :click="showService"
    />
</template>

<script>
    import { mapActions } from 'vuex';
    import Tab from '../tabs/Tab';

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
            showService() {
                this.setActive(this.service.identifier);
            },

            ...mapActions('services', ['setActive']),
        },
    };
</script>
