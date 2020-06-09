<template>
    <BottomTab identifier="mutenotifications" :icon="icon" :click="toggleNotifications" />
</template>

<script>
import BottomTab from "../tabs/BottomTab";

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
    created: function() {
        this.icon = notificationsOff;
    },
    methods: {
        toggleNotifications() {
            this.icon =
                this.icon === notificationsOff
                    ? notificationsOn
                    : notificationsOff;

            // Todo actually persist notifications toggled
            console.log("notifications togggled");
        }
    }
};
</script>
