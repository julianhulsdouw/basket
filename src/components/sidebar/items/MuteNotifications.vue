<template>
    <BottomTab identifier="mutenotifications" :icon="icon" :click="toggleNotifications" />
</template>

<script>
import BottomTab from "../tabs/BottomTab";
import { mapActions, mapState } from "vuex";

const notificationsOff = "static/icons/notifications_off-24px.svg";
const notificationsOn = "static/icons/notifications-24px.svg";

export default {
    name: "MuteNotifications",
    components: {
        BottomTab
    },
    computed: {
        icon() {
            return this.$store.state.settings.notificationsMuted
                ? notificationsOff
                : notificationsOn;
        }
    },
    methods: {
        ...mapActions({
            toggleNotifications: "settings/toggleNotifications"
        })
    }
};
</script>
