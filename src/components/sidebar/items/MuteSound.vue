<template>
    <BottomTab identifier="mutesound" :icon="icon" :click="toggleSound" />
</template>

<script>
import BottomTab from "../tabs/BottomTab";

const soundOff = "static/serviceIcons/volume_off-24px.svg";
const soundOn = "static/serviceIcons/volume_up-24px.svg";

export default {
    name: "MuteSound",
    components: {
        BottomTab
    },

    data: () => {
        return {
            icon: null
        };
    },
    created: function() {
        this.icon = soundOff;
    },
    methods: {
        toggleSound() {
            this.icon = this.icon === soundOff ? soundOn : soundOff;

            // Todo actually persist sound toggled
            console.log("sound togggled");
        }
    }
};
</script>
