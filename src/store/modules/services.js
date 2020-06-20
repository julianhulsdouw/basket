import { v4 as uuidv4 } from 'uuid';
import settings from 'electron-settings';

settings.configure({ prettify: true });

const state = {
    services: [],
};

const getters = {
    allServices: (state) => {
        return state.services;
    },

    // eslint-disable-next-line arrow-body-style
    serviceByIdentifier: (state) => (identifier) => {
        return state.services.filter(
            (service) => service.identifier === identifier,
        )[0];
    },

    // eslint-disable-next-line arrow-body-style
    activeService: (state) => {
        return state.services.filter((service) => service.visible === true)[0];
    },

    // eslint-disable-next-line arrow-body-style
    enabledServices: (state) => {
        return state.services.filter((service) => service.enabled === true);
    },

    // eslint-disable-next-line arrow-body-style
    sortedServices: (state) => {
        return state.services
            .slice()
            .sort((a, b) => (a.index > b.index ? 1 : -1));
    },
};

const actions = {
    async loadServices({ commit }) {
        commit('setServices', await settings.get('services'));
    },

    setServices({ commit, state }, services) {
        commit('setServices', services);

        commit('correctIndex');

        settings.set('services', state.services);
    },

    addService({ commit, state }) {
        const newServiceIdentifier = uuidv4();
        const newService = {
            icon: './static/icons/basket.svg',
            identifier: newServiceIdentifier,
            index: state.services.length,
            visible: false,
            title: 'New service',
            url: './preferences.html',
        };

        commit('addService', newService);
        commit('changeActiveService', newServiceIdentifier);

        settings.set('services', state.services);
    },

    removeService({ commit, state }, identifier) {
        commit('removeService', identifier);

        commit('correctIndex');

        settings.set('services', state.services);
    },

    toggleService({ commit, getters, state }, identifier) {
        commit('toggleService', identifier);

        if (
            getters.activeService.identifier === identifier &&
            getters.enabledServices.length
        ) {
            commit(
                'changeActiveService',
                getters.enabledServices[0].identifier,
            );
        }

        settings.set('services', state.services);
    },

    toggleNotifications({ commit, state }, identifier) {
        commit('toggleNotifications', identifier);

        settings.set('services', state.services);
    },

    toggleSound({ commit, state }, identifier) {
        commit('toggleSound', identifier);

        settings.set('services', state.services);
    },

    setActive({ commit, state }, identifier) {
        commit('changeActiveService', identifier);

        settings.set('services', state.services);
    },

    setMessageCount({ commit }, data) {
        commit('setMessageCount', data);
    },
};

const mutations = {
    setServices(state, services) {
        state.services = services;
    },

    addService(state, service) {
        state.services.push(service);
    },

    changeActiveService(state, identifier) {
        state.services.forEach((service) => {
            service.visible = false;
        });

        state.services
            .filter((service) => service.identifier === identifier)
            .forEach((service) => {
                service.visible = true;
            });
    },

    removeService(state, identifier) {
        const index = state.services.indexOf(
            state.services.filter(
                (service) => service.identifier === identifier,
            )[0],
        );
        state.services.splice(index, 1);
    },

    correctIndex(state) {
        state.services.forEach((service, index) => {
            service.index = index;
        });
    },

    toggleService(state, identifier) {
        state.services
            .filter((service) => service.identifier === identifier)
            .forEach((service) => {
                service.enabled = !service.enabled;
            });
    },

    toggleNotifications(state, identifier) {
        state.services
            .filter((service) => service.identifier === identifier)
            .forEach((service) => {
                service.notificationsEnabled = !service.notificationsEnabled;
            });
    },

    toggleSound(state, identifier) {
        state.services
            .filter((service) => service.identifier === identifier)
            .forEach((service) => {
                service.soundEnabled = !service.soundEnabled;
            });
    },

    setMessageCount(state, data) {
        state.services
            .filter((service) => service.identifier === data.identifier)
            .forEach((service) => {
                service.notificationCount = data.count;
            });
    },
};

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};
