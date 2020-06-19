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
    import electron from 'electron';
    import { mapActions } from 'vuex';
    import GetWebview from '../../library/webview';
    import NotificationHandler from '../../library/ipc/NotificationHandler';

    const shell = electron.shell;

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
                webview.addEventListener('new-window', (event) => {
                    event.preventDefault();
                    shell.openExternal(event.url);
                });

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

                    if (event.channel === 'notification') {
                        const options = event.args[0].options;
                        options.identifier = this.service.identifier;
                        options.title = event.args[0].title;

                        new NotificationHandler( // eslint-disable-line
                            event.args[0].notificationId,
                            options,
                            this.$store,
                        );
                    }
                });
            });
        },
        methods: {
            ...mapActions('services', ['setMessageCount']),
        },
    };
</script>
