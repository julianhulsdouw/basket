import settings from '../../library/settings';

const state = {
    soundMuted: false,
    notificationsMuted: false,
    dockBounce: false,
    enabledSearchProviders: ['google'],
    language: 'english',
};

const getters = {
    getNotificationsMuted: (state) => state.notificationsMuted,

    getSoundMuted: (state) => state.soundMuted,

    getDockBounce: (state) => state.dockBounce,

    getEnabledSearchProviders: (state) => state.enabledSearchProviders,

    getLanguage: (state) => state.language,
};

const actions = {
    async loadSettings({ commit }) {
        commit('setNotifications', await settings.get('notificationsMuted'));
        commit('setSound', await settings.get('soundMuted'));
        commit('setDockBounce', await settings.get('dockBounce'));
        commit(
            'setEnabledSearchProviders',
            await settings.get('enabledSearchProviders'),
        );
        commit('setLanguage', await settings.get('language'));
    },

    async toggleNotifications({ commit, state }) {
        const notificationsMuted = !state.notificationsMuted;

        commit('setNotifications', notificationsMuted);

        // Persist to disk
        settings.set('notificationsMuted', notificationsMuted);
    },

    async toggleSound({ commit, state }) {
        const soundMuted = !state.soundMuted;

        commit('setSound', soundMuted);

        // Persist to disk
        settings.set('soundMuted', soundMuted);
    },

    async toggleDockBounce({ commit, state }) {
        const dockBounce = !state.dockBounce;

        commit('setDockBounce', dockBounce);

        // Persist to disk
        settings.set('dockBounce', dockBounce);
    },

    async setNotificationsMuted({ commit }, value) {
        commit('setNotifications', value);

        // Persist to disk
        settings.set('notificationsMuted', value);
    },

    async setSoundMuted({ commit }, value) {
        commit('setSound', value);

        // Persist to disk
        settings.set('soundMuted', value);
    },

    async setDockBounce({ commit }, value) {
        commit('setDockBounce', value);

        // Persist to disk
        settings.set('dockBounce', value);
    },

    async setEnabledSearchProviders({ commit }, value) {
        commit('setEnabledSearchProviders', value);

        // Persist to disk
        settings.set('enabledSearchProviders', value);
    },

    async setLanguage({ commit }, value) {
        commit('setLanguage', value);

        // Persist to disk
        settings.set('language', value);
    },
};

const mutations = {
    setNotifications(state, value) {
        state.notificationsMuted = value;
    },

    setSound(state, value) {
        state.soundMuted = value;
    },

    setDockBounce(state, value) {
        state.dockBounce = value;
    },

    setEnabledSearchProviders(state, value) {
        state.enabledSearchProviders = value;
    },

    setLanguage(state, value) {
        state.language = value;
    },
};

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};
