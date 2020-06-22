<template>
    <div class="app">
        <div class="draggable">&nbsp;</div>

        <div class="layout">
            <div class="layout">
                <Sidebar />

                <div class="content">
                    <Webviews />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Sidebar from './Sidebar';
    import Webviews from './Webviews';

    export default {
        name: 'App',
        components: {
            Sidebar,
            Webviews,
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
            position: absolute;
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
