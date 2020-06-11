<template>
    <Tab
        :identifier="identifier"
        icon="static/icons/preferences.svg"
        :click="showService"
    />
</template>

<script>
    import Tab from '../tabs/Tab';

    export default {
        name: 'Service',
        components: {
            Tab,
        },
        props: {
            identifier: {
                required: true,
                type: String,
            },
        },
        methods: {
            showService() {
                console.log('kapot');
            },
        },
    };
</script>
