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
        },
        {
            icon: './static/services/whatsapp.svg',
            identifier: 'sBfhUVp2Aw6N8cvvJ3Zp',
            index: 1,
            visible: false,
            title: 'Whatsapp',
            url: 'https://web.whatsapp.com',
        },
    ],
};

const getters = {};

const actions = {
    async addService() {
        console.log('service created');
    },

    setActive({ commit }, data) {
        commit('changeActiveService', data);
    },
};

const mutations = {
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
