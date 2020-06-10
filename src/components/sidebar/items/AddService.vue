<template>
    <Tab identifier="mutenotifications" icon="static/icons/plus-solid.svg" :click="addService" />
</template>

<script>
import Tab from "../tabs/Tab";
import { mapActions, mapState } from "vuex";

export default {
    name: "AddService",
    components: {
        Tab
    },
    methods: {
        showAddModal() {
            // Add service to state / persist.
        }
    },
    methods: {
        ...mapActions("services", ["addService"])
    }
};
</script>
