<template>
    <div class="views">
        <div
            :key="service.identifier"
            v-for="service in enabledServices"
            class="view"
            :class="{ 'view-active': service.visible }"
        >
            <ServiceWebview :service="service"></ServiceWebview>
        </div>

        <div id="preferences" class="view" key="preferences">
            <webview
                class="innner-view"
                src="./preferences.html"
                style="width: 100%;height: 100%;"
            ></webview>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ServiceWebview from '@/components/webview/ServiceWebview';

    export default {
        name: 'Webviews',
        components: {
            ServiceWebview,
        },
        computed: {
            ...mapGetters('services', ['enabledServices']),
        },
    };
</script>
<style lang="scss">
    .views {
        width: 100%;
        height: 100%;

        .view {
            display: none;
            flex: 1;
            height: 100%;
            background-color: $silver;

            &-active {
                display: block;
            }
        }
    }
</style>
