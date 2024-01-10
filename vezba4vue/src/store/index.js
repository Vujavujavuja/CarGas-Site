import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentPageTitle: 'Welcome to Our Gas Station',
        servicesList: [],
        fuelPrices: []
    },
    mutations: {
        SET_CURRENT_PAGE_TITLE(state, title) {
            state.currentPageTitle = title;
        },
        SET_SERVICES_LIST(state, services) {
            state.servicesList = services;
        },
        SET_FUEL_PRICES(state, prices) {
            state.fuelPrices = prices;
        }
    },
    actions: {
        fetchServicesList({ commit }) {
            // Fetch from an API or local data source
            const services = []; // Replace with actual data fetching
            commit('SET_SERVICES_LIST', services);
        },
        fetchFuelPrices({ commit }) {
            // Fetch from an API or local data source
            const prices = []; // Replace with actual data fetching
            commit('SET_FUEL_PRICES', prices);
        }
    }
});
