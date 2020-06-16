<template>
    <div style="width: 100%;height: 100%;" :id="service.identifier">
        <webview
            autosize
            :key="service.identifier"
            class="innner-view"
            :src="service.url"
            preload="./services/preload.js"
            style="width: 100%;height: 100%;"
            :partition="'persist:service-' + service.identifier"
        ></webview>
    </div>
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
    };
</script>
