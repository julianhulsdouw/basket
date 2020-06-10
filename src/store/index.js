import Vue from 'vue';
import Vuex from 'vuex';

import services from './modules/services';
import settings from './modules/settings';

Vue.use(Vuex);

settings.actions

export default new Vuex.Store({
    modules: {
        settings,
    },
    strict: process.env.NODE_ENV !== 'production',
});
