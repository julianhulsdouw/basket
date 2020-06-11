<template>
    <div class="views">
        <div
            :key="service.identifier"
            v-for="service in sortedServices"
            class="view"
            :class="{ 'view-active': service.visible }"
        >
            <webview
                autosize
                :key="service.identifier"
                class="innner-view"
                :src="service.url"
                :partition="'persist:service-' + service.identifier"
                style="width: 100%;height: 100%;"
            ></webview>
        </div>

        <div id="preferences" class="view" key="preferences">
            <webview
                id="foo"
                class="innner-view"
                src="./preferences.html"
                style="width: 100%;height: 100%;"
            ></webview>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Webviews',

        computed: {
            sortedServices() {
                return this.$store.state.services.services;
            },
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
