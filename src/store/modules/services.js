import { v4 as uuidv4 } from 'uuid';
import AppMenu from '../../library/menu/main';
import store from '../../store'; // eslint-disable-line

const state = {
    activeService: null,
    services: [
        {
            icon: './static/services/slack.svg',
            identifier: 'G3aHRDw7aQyfncv5L7d',
            index: 0,
            visible: true,
            title: 'Slack',
            url: 'https://slack.com',
            soundEnabled: true,
            notificationsEnabled: true,
            enabled: true,
        },
        {
            icon: './static/services/whatsapp.svg',
            identifier: 'sBfhUVp2Aw6N8cvvJ3Zp',
            index: 1,
            visible: false,
            title: 'Whatsapp',
            url: 'https://web.whatsapp.com',
            soundEnabled: true,
            notificationsEnabled: true,
            enabled: true,
        },
    ],
};

const getters = {};

const actions = {
    async addService({ commit, state }) {
        const newService = {
            icon: './static/icons/basket.svg',
            identifier: uuidv4(),
            index: state.services.length,
            visible: false,
            title: 'New service',
            url: './preferences.html',
        };

        commit('addService', newService);

        new AppMenu(store); // eslint-disable-line

        commit(
            'changeActiveService',
            state.services[state.services.length - 1].identifier,
        );
    },

    setActive({ commit }, data) {
        commit('changeActiveService', data);
    },
};

const mutations = {
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
};

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};
