import { ipcRenderer } from 'electron';
import Vue from 'vue';
import Vuex from 'vuex';
import vuetify from './config/vuetify';
import store from './store';
import App from './components/App';
import AppMenu from './library/menu/main';
import i18n from './library/lang';

Vue.use(Vuex);

window.webviews = [];

new Vue({
    async created() {
        await this.loadSettings();
        await this.loadServices();

        this.$menu = new AppMenu(store);

        setInterval(() => {
            ipcRenderer.send(
                'app-notification-count',
                this.getTotalNotificationCount(),
            );
        }, 3000);
    },
    methods: {
        ...Vuex.mapActions('settings', ['loadSettings']),
        ...Vuex.mapActions('services', ['loadServices']),
        ...Vuex.mapGetters('services', ['getTotalNotificationCount']),
    },
    components: { App },
    template: '<App/>',
    store,
    i18n,
    vuetify,
}).$mount('#app');
