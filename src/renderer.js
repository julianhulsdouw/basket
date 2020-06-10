import App from './components/App'
import Vue from 'vue';
import Vuex from 'vuex';
import store from './store'
import { mapActions } from "vuex";

Vue.use(Vuex);

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
    store
}).$mount('#app');
