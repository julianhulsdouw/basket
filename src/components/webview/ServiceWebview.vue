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
            :useragent="userAgent"
        ></webview>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import GetWebview from '../../library/webview';

    export default {
        name: 'ServiceWebview',
        props: {
            service: {
                required: true,
                type: Object,
            },
        },
        computed: {
            userAgent() {
                return window.navigator.userAgent.replace(
                    /(Basket|Electron)([^\s]+\s)/g,
                    '',
                );
            },
        },
        mounted() {
            const webview = GetWebview(this.service.identifier);
            const service = this.service;

            this.$nextTick(() => {
                webview.addEventListener('ipc-message', (event) => {
                    if (event.channel === 'init') {
                        webview.send('init-recipe', {
                            recipe: service.recipe,
                        });
                    }

                    if (event.channel === 'message-count') {
                        const unreadMessages = event.args[0] || 0;

                        this.setMessageCount({
                            identifier: this.service.identifier,
                            count: unreadMessages,
                        });
                    }

                    // TODO: Hijack notifications

                    // if (event.channel === 'notification') {
                    //     const options = event.args[0].options;
                    //     options.serviceId = this.id;
                    //     options.title = event.args[0].title;

                    //     new IpcHandler(event.args[0].notificationId, options);
                    // }
                });
            });
        },
        methods: {
            ...mapActions('services', ['setMessageCount']),
        },
    };
</script>
