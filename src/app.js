import App from './components/App'
import Vue from 'vue';
import VueI18n from 'vue-i18n'
import Vuex from 'vuex';
import store from './store'
import { mapActions } from "vuex";

Vue.use(Vuex);
Vue.use(VueI18n);

new Vue({
    created: async function () {
        await this.loadSettings();
    },
    methods: {
        ...mapActions({
            loadSettings: "settings/loadSettings"
        }),
    },
    components: { App },
    template: '<App/>',
    store,
    i18n: new VueI18n({
        locale: 'nl',
        fallbackLocale: 'en',
        messages: {
            en: require('./resources/lang/en.json'),
            nl: require('./resources/lang/nl.json')
        }
    }),
}).$mount('#app');
