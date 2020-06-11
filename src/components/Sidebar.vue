<template>
    <div class="outer-sidebar">
        <div class="sidebar">
            <ul class="services">
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

    export default {
        name: 'Sidebar',
        components: {
            AddService,
            MuteNotifications,
            MuteSound,
        },
    };
</script>

<style lang="scss">
    .outer-sidebar {
        flex: 0 0 72px;
        height: 100%;
    }

    .sidebar {
        flex: 0 0 72px;
        float: left;
        height: 100%;
        width: 72px;
        position: fixed;
        z-index: 1;
        top: 0;
        padding-top: 16px;
        left: 0;
        background-color: $shark;

        .services {
            margin-top: 16px;
            position: relative;
            width: 100%;
            list-style-type: none;
            padding-inline-start: 0px;
        }

        .bottom {
            margin-bottom: 24px;
            bottom: 0;
            position: absolute;
            width: 100%;
            list-style-type: none;
            padding-inline-start: 0px;
        }
    }
</style>
