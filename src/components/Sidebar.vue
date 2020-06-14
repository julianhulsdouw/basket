<template>
    <div class="outer-sidebar">
        <div class="sidebar">
            <ul class="services">
                <Services />

                <AddService />
            </ul>

            <div class="bottom">
                <MuteNotifications />
                <MuteSound />
            </div>
        </div>
    </div>
</template>

<script>
    import AddService from './sidebar/items/AddService';
    import MuteNotifications from './sidebar/items/MuteNotifications';
    import MuteSound from './sidebar/items/MuteSound';
    import Services from './sidebar/Services';

    export default {
        name: 'Sidebar',
        components: {
            AddService,
            MuteNotifications,
            MuteSound,
            Services,
        },
    };
</script>

<style lang="scss" scoped>
    .outer-sidebar {
        flex: 0 0 72px;
        height: 100%;
    }

    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        flex: 0 0 72px;
        width: 72px;
        height: 100%;
        padding-top: 16px;
        background-color: $shark;

        .services {
            position: relative;
            width: 100%;
            height: calc(100% - 172px);
            margin-top: 16px;
            overflow-y: auto;
            list-style-type: none;
            padding-inline-start: 0;
        }

        .services::-webkit-scrollbar {
            width: 0;
            background: transparent; /* make scrollbar transparent */
        }

        .bottom {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 112px;
            margin-bottom: 24px;
            list-style-type: none;
            padding-inline-start: 0;
        }
    }
</style>
