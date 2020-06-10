<template>
    <Tab :identifier="identifier" :icon="icon" :click="click" />
</template>

<script>
import Tab from "./Tab";

export default {
    name: "BottomTab",
    components: {
        Tab
    },
    props: {
        icon: {
            required: true,
            type: String
        },
        identifier: {
            required: true,
            type: String
        },
        click: {
            required: true
        }
    }
};
</script>

<style lang="scss">
.bottom .sidebar-item .sidebar-logo {
    height: 24px;
}
</style>
