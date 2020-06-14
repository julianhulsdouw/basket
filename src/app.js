import Vue from 'vue';
import Vuex from 'vuex';
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
    },
    methods: {
        ...Vuex.mapActions('settings', ['loadSettings']),
        ...Vuex.mapActions('services', ['loadServices']),
    },
    components: { App },
    template: '<App/>',
    store,
    i18n,
}).$mount('#app');
