<template>
    <BottomTab identifier="mutesound" :icon="icon" :click="toggleSound" />
</template>

<script>
import BottomTab from "../tabs/BottomTab";
import settings from "electron-settings";

const soundOff = "static/serviceIcons/volume_off-24px.svg";
const soundOn = "static/serviceIcons/volume_up-24px.svg";

export default {
    name: "MuteSound",
    components: {
        BottomTab
    },

    data: () => {
        return {
            icon: "static/icons/basket.svg"
        };
    },
    created: async function() {
        const soundMuted = await settings.get("soundMuted");

        this.icon = soundMuted ? soundOff : soundOn;
    },
    methods: {
        toggleSound() {
            this.icon = this.icon === soundOff ? soundOn : soundOff;

            settings.set("soundMuted", this.icon === soundOff);
        }
    }
};
</script>
