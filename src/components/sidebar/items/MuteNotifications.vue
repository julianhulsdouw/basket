<template>
    <Tab identifier="mutenotifications" :icon="icon" :click="toggleNotifications" />
</template>

<script>
import Tab from "../tabs/Tab";
import { mapActions, mapState } from "vuex";

export default {
    name: "MuteNotifications",
    components: {
        Tab
    },
    computed: {
        icon() {
            return this.$store.state.settings.notificationsMuted
                ? "static/icons/notifications_off-24px.svg"
                : "static/icons/notifications-24px.svg";
        }
    },
    methods: {
        ...mapActions("settings", ["toggleNotifications"])
    }
};
</script>
