<template>
    <div class="outer-sidebar">
        <div class="sidebar">
            <div class="logo">
                <span>basket</span>
            </div>

            <ul class="services">
                <Services />

                <AddService />
            </ul>

            <div class="bottom">
                <MuteSound />
                <MuteNotifications />
            </div>
        </div>
    </div>
</template>

<script>
    import AddService from '@/components/sidebar/items/AddService';
    import MuteNotifications from '@/components/sidebar/items/MuteNotifications';
    import MuteSound from '@/components/sidebar/items/MuteSound';
    import Services from '@/components/sidebar/Services';

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
            height: calc(100% - 172px);
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
            height: 112px;
            list-style-type: none;
            padding-inline-start: 0;
        }
    }
</style>
