<template>
    <BottomTab
        identifier="preferences"
        icon="static/serviceIcons/preferences.svg"
        :click="showPreferences"
    />
</template>

<script>
import BottomTab from "../tabs/BottomTab";

export default {
    name: "Preferences",
    components: {
        BottomTab
    },
    methods: {
        showPreferences() {
            console.log("kapot");
        }
    }
};
</script>
