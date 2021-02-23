<template>
    <panel title="Preferences">
        <v-container class="pa-6" fluid>
            <v-switch
                v-model="switch1"
                :label="`Switch 1: ${switch1.toString()}`"
            ></v-switch>
        </v-container>
    </panel>
</template>

<script>
    import { VContainer, VSwitch } from 'vuetify/lib';
    import Panel from '../Panel';

    export default {
        name: 'Preferences',
        data() {
            return {
                switch1: true,
            };
        },
        components: {
            Panel,
            VContainer,
            VSwitch,
        },
        computed: {},
        methods: {},
    };
</script>
