<template>
    <div class="outer-sidebar">
        <div class="sidebar">
            <ul class="services">
                <Service
                    :key="service.index"
                    v-for="service in sortedServices"
                    :service="service"
                />

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
    import Service from './sidebar/items/Service';

    export default {
        name: 'Sidebar',
        components: {
            AddService,
            MuteNotifications,
            MuteSound,
            Service,
        },
        computed: {
            sortedServices() {
                return this.$store.state.services.services;
            },
        },
    };
</script>

<style lang="scss">
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
        float: left;
        width: 72px;
        height: 100%;
        padding-top: 16px;
        background-color: $shark;

        .services {
            position: relative;
            width: 100%;
            margin-top: 16px;
            list-style-type: none;
            padding-inline-start: 0;
        }

        .bottom {
            position: absolute;
            bottom: 0;
            width: 100%;
            margin-bottom: 24px;
            list-style-type: none;
            padding-inline-start: 0;
        }
    }
</style>
