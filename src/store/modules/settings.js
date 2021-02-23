import settings from '../../library/settings';

const state = {
    soundMuted: false,
    notificationsMuted: false,
    dockBounce: false,
};

const getters = {
    getNotificationsMuted: (state) => state.notificationsMuted,

    getSoundMuted: (state) => state.soundMuted,

    getDockBounce: (state) => state.dockBounce,
};

const actions = {
    async loadSettings({ commit }) {
        commit('setNotifications', await settings.get('notificationsMuted'));
        commit('setSound', await settings.get('soundMuted'));
        commit('setDockBounce', await settings.get('dockBounce'));
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
};

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};
