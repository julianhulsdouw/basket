<template>
    <BottomTab identifier="mutesound" :icon="icon" :click="toggleSound" />
</template>

<script>
import BottomTab from "../tabs/BottomTab";
import { mapActions, mapState } from "vuex";

const soundOff = "static/icons/volume_off-24px.svg";
const soundOn = "static/icons/volume_up-24px.svg";

export default {
    name: "MuteSound",
    components: {
        BottomTab
    },
    computed: {
        icon() {
            return this.$store.state.settings.soundMuted ? soundOff : soundOn;
        }
    },
    methods: {
        ...mapActions("settings", ["toggleSound"])
    }
};
</script>
