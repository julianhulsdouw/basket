import Vue from 'vue';
import Vuex from 'vuex';

import panels from './modules/panels';
import services from './modules/services';
import settings from './modules/settings';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        panels,
        settings,
        services,
    },
    strict: process.env.NODE_ENV !== 'production',
});
