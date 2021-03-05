import Vue from 'vue';
import Vuex from 'vuex';
import vuetify from './config/vuetify';
import i18n from './config/i18n';
import store from './config/store';
import App from './components/App';
import ipcRendererInit from './library/ipc/renderer';

Vue.use(Vuex);

new Vue({
    async created() {
        await this.loadSettings();
        await this.loadServices();

        ipcRendererInit(store);
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
