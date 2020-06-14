<template>
    <webview
        autosize
        :key="service.identifier"
        class="innner-view"
        :src="service.url"
        :partition="'persist:service-' + service.identifier"
        style="width: 100%;height: 100%;"
    ></webview>
</template>

<script>
    export default {
        name: 'ServiceWebview',
        props: {
            service: {
                required: true,
                type: Object,
            },
        },
        methods: {},
    };
</script>
