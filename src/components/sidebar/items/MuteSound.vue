<template>
    <Tab identifier="mutesound" :icon="icon" :click="toggleSound" />
</template>

<script>
import Tab from "../tabs/Tab";
import { mapActions, mapState } from "vuex";

export default {
    name: "MuteSound",
    components: {
        Tab
    },
    computed: {
        icon() {
            return this.$store.state.settings.soundMuted
                ? "static/icons/volume_off-24px.svg"
                : "static/icons/volume_up-24px.svg";
        }
    },
    methods: {
        ...mapActions("settings", ["toggleSound"])
    }
};
</script>
