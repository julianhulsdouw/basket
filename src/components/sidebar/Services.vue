<template>
    <div class="sortable-services">
        <SlickList lock-axis="y" :distance="2" v-model="services">
            <SlickItem
                v-for="(service, index) in services"
                :index="index"
                :key="index"
            >
                <Service :service="service" />
            </SlickItem>
        </SlickList>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import { SlickList, SlickItem } from 'vue-slicksort';
    import Service from './items/Service';
    import AppMenu from '../../library/menu/main';

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

                    new AppMenu(this.$store); // eslint-disable-line no-new
                },
            },

            ...mapGetters('services', ['sortedServices']),
        },

        methods: {
            ...mapActions('services', ['setServices']),
        },
    };
</script>
