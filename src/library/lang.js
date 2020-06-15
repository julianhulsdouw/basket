import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from '@/resources/lang/en.json';
import nl from '@/resources/lang/nl.json';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        nl,
    },
});

export default i18n;
