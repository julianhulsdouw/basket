<template>
    <BottomTab identifier="mutenotifications" :icon="icon" :click="toggleNotifications" />
</template>

<script>
import BottomTab from "../tabs/BottomTab";
import settings from "electron-settings";

const notificationsOff = "static/serviceIcons/notifications_off-24px.svg";
const notificationsOn = "static/serviceIcons/notifications-24px.svg";

export default {
    name: "MuteNotifications",
    components: {
        BottomTab
    },

    data: () => {
        return {
            icon: null
        };
    },
    created: async function() {
        const notificationsMuted = await settings.get("notificationsMuted");

        this.icon = notificationsMuted ? notificationsOff : notificationsOn;
    },
    methods: {
        toggleNotifications() {
            this.icon =
                this.icon === notificationsOff
                    ? notificationsOn
                    : notificationsOff;

            settings.set("notificationsMuted", this.icon === notificationsOff);
        }
    }
};
</script>
