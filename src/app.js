import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';
import store from './store';
import App from './components/App';

import en from './resources/lang/en.json';
import nl from './resources/lang/nl.json';

Vue.use(Vuex);
Vue.use(VueI18n);

new Vue({
    async created() {
        await this.loadSettings();
    },
    methods: {
        ...Vuex.mapActions('settings', ['loadSettings']),
    },
    components: { App },
    template: '<App/>',
    store,
    i18n: new VueI18n({
        locale: 'en',
        fallbackLocale: 'en',
        messages: {
            en,
            nl,
        },
    }),
}).$mount('#app');
