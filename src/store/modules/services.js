const state = {
    activeService: null,
    services: [
        {
            icon: "./static/services/slack.svg",
            index: 0,
            title: "Slack",
            url: "https://slack.com"
        },
        {
            icon: "./static/services/whatsapp.svg",
            index: 1,
            title: "Whatsapp",
            url: "https://web.whatsapp.com"
        }
    ]
};

const getters = {

};

const actions = {
    async addService({ }, data) {
        console.log('service created');
    },
};

const mutations = {

};

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};
