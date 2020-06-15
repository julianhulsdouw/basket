import Vue from 'vue';
import Vuex from 'vuex';

import services from '@/store/modules/services';
import settings from '@/store/modules/settings';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        settings,
        services,
    },
    strict: process.env.NODE_ENV !== 'production',
});
