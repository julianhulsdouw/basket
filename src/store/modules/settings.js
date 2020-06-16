import settings from 'electron-settings';

settings.configure({ prettify: true });

const state = {
    soundMuted: false,
    notificationsMuted: false,
};

const getters = {
    getNotificationsMuted: (state) => state.notificationsMuted,

    getSoundMuted: (state) => state.soundMuted,
};

const actions = {
    async loadSettings({ commit }) {
        commit('setNotifications', await settings.get('notificationsMuted'));
        commit('setSound', await settings.get('soundMuted'));
    },

    async toggleNotifications({ commit, state }) {
        const notificationsMuted = !state.notificationsMuted;

        commit('setNotifications', notificationsMuted);

        // Persist to disk
        await settings.set('notificationsMuted', notificationsMuted);
    },

    async toggleSound({ commit, state }) {
        const soundMuted = !state.soundMuted;

        commit('setSound', soundMuted);

        // Persist to disk
        await settings.set('soundMuted', soundMuted);
    },
};

const mutations = {
    setNotifications(state, value) {
        state.notificationsMuted = value;
    },

    setSound(state, value) {
        state.soundMuted = value;
    },
};

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};
