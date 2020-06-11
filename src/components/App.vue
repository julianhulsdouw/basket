<template>
    <div class="app">
        <div class="draggable">&nbsp;</div>

        <div class="layout">
            <div class="layout">
                <Sidebar />

                <div class="content">
                    <DisconnectedBar />
                    <Webviews />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Sidebar from './Sidebar';
    import Webviews from './Webviews';
    import DisconnectedBar from './DisconnectedBar';

    export default {
        name: 'App',
        components: {
            DisconnectedBar,
            Sidebar,
            Webviews,
        },
    };
</script>

<style lang="scss">
    .app {
        background-color: $silver;
        position: absolute;
        display: flex;
        height: 100%;
        width: 100%;

        .draggable {
            height: 50px;
            left: 0;
            pointer-events: none;
            position: absolute;
            top: 0;
            width: 100%;
            z-index: 9999;
            -webkit-app-region: drag;
        }

        .layout {
            position: absolute;
            display: flex;
            height: 100%;
            width: 100%;
        }

        .content {
            width: 100%;
        }
    }
</style>
