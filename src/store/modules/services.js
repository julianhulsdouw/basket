const state = {
    activeService: null,
    services: []
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
