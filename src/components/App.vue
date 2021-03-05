<template>
    <v-app>
        <div class="app">
            <div class="draggable">&nbsp;</div>

            <div class="layout">
                <div class="layout">
                    <Sidebar />

                    <template v-if="currentActivePanel === 'service'">
                        <Service />
                    </template>

                    <template v-else-if="currentActivePanel === 'preferences'">
                        <Preferences />
                    </template>

                    <div class="content">
                        <Webviews />
                    </div>
                </div>
            </div>
        </div>
    </v-app>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { VApp } from 'vuetify/lib';
    import Sidebar from './Sidebar';
    import Service from './panels/items/Service';
    import Preferences from './panels/items/Preferences';
    import Webviews from './Webviews';

    export default {
        name: 'App',
        components: {
            Service,
            Sidebar,
            Webviews,
            Preferences,
            VApp,
        },
        computed: {
            currentActivePanel() {
                return this.activePanel();
            },
        },
        methods: {
            ...mapGetters('panels', ['activePanel']),
        },
    };
</script>

<style lang="scss">
    .app {
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        background-color: $silver;

        .draggable {
            position: relative;
            top: 0;
            left: 0;
            z-index: 9999;
            width: 100%;
            height: 50px;
            pointer-events: none;
            -webkit-app-region: drag;
        }

        .layout {
            position: absolute;
            display: flex;
            width: 100%;
            height: 100%;
        }

        .content {
            width: 100%;
            overflow: hidden;
        }
    }
</style>
