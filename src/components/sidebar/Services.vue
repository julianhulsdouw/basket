<template>
    <SlickList lock-axis="y" :distance="2" v-model="services">
        <SlickItem
            v-for="(service, index) in services"
            :index="index"
            :key="index"
            class="slick-item"
        >
            <Service :service="service" />
        </SlickItem>
    </SlickList>
</template>

<script>
    import { ipcRenderer } from 'electron';
    import { mapActions, mapGetters } from 'vuex';
    import { SlickList, SlickItem } from 'vue-slicksort';
    import Service from './items/Service';

    export default {
        name: 'Services',
        components: {
            SlickList,
            SlickItem,
            Service,
        },
        computed: {
            services: {
                get() {
                    return this.sortedServices;
                },

                set(value) {
                    this.setServices(value);

                    ipcRenderer.send('re-draw-menu');
                },
            },

            ...mapGetters('services', ['sortedServices']),
        },

        methods: {
            ...mapActions('services', ['setServices']),
        },
    };
</script>

<style lang="scss" scoped>
    .slick-item {
        z-index: 9999;
    }
</style>
