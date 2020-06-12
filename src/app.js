import Vue from 'vue';
import Vuex from 'vuex';
import store from './store';
import App from './components/App';
import AppMenu from './library/menu/main';
import i18n from './library/lang';

Vue.use(Vuex);

new Vue({
    async created() {
        await this.loadSettings();

        this.$menu = new AppMenu(store);
    },
    methods: {
        ...Vuex.mapActions('settings', ['loadSettings']),
    },
    components: { App },
    template: '<App/>',
    store,
    i18n,
}).$mount('#app');
