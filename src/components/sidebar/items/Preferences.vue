<template>
    <Tab
        identifier="preferences"
        icon="static/icons/settings-black-18dp.svg"
        :click="showPreferences"
    />
</template>

<script>
    import Tab from '@/components/sidebar/tabs/Tab';

    export default {
        name: 'Preferences',
        components: {
            Tab,
        },
        methods: {
            showPreferences() {
                console.log('kapot');
            },
        },
    };
</script>
