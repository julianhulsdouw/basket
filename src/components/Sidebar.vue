<template>
    <div class="outer-sidebar">
        <div class="sidebar">
            <div class="logo">
                <span>basket</span>
            </div>

            <ul class="services">
                <Services />
            </ul>

            <div class="bottom">
                <MuteSound />
                <MuteNotifications />
                <Preferences />
            </div>
        </div>
    </div>
</template>

<script>
    import MuteNotifications from './sidebar/items/MuteNotifications';
    import MuteSound from './sidebar/items/MuteSound';
    import Preferences from './sidebar/items/Preferences';
    import Services from './sidebar/Services';

    export default {
        name: 'Sidebar',
        components: {
            MuteNotifications,
            MuteSound,
            Preferences,
            Services,
        },
    };
</script>

<style lang="scss">
    .outer-sidebar {
        flex: 0 0 68px;
        height: 100%;
    }

    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        width: 68px;
        height: 100%;
        user-select: none;
        background-color: $firefly;

        .logo {
            width: 100%;
            height: 52px;
            background-color: $blue-stone;

            span {
                position: absolute;
                padding-top: 25px;
                margin-left: 10px;
                font-family: 'Lato', sans-serif;
                font-size: 16px;
                color: $gallery;
            }
        }

        .services {
            position: relative;
            width: 100%;
            height: calc(100% - 262px);
            margin-top: 8px;
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
            width: 100%;
            list-style-type: none;
            padding-inline-start: 0;
        }
    }
</style>
