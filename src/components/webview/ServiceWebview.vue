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
    import GetWebview from '../../library/webview';

    export default {
        name: 'ServiceWebview',
        props: {
            service: {
                required: true,
                type: Object,
            },
        },
        mounted() {
            this.$nextTick(() => {
                const webview = GetWebview(this.service.identifier);
                const service = this.service;
                webview.addEventListener('ipc-message', (event) => {
                    if (event.channel === 'init') {
                        // const modulePath = path.join(__dirname, "/Services/whatsapp.com/index");
                        // console.log(modulePath);
                        // import(/* webpackMode: "eager" */ modulePath);
                        // const test = require('./Services/whatsapp.com/index.js');
                        console.log('ping');
                        webview.send('init-recipe', {
                            recipe: service.recipe,
                        });
                    }

                    // if (event.channel === 'notification') {
                    //     const options = event.args[0].options;
                    //     options.serviceId = this.id;
                    //     options.title = event.args[0].title;

                    //     new IpcHandler(event.args[0].notificationId, options);
                    // }
                });
            });
        },
    };
</script>
