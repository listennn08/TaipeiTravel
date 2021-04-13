import Vue from 'vue';
import Vuex from 'vuex';
import articleModule from './articleModule';
import loginModule from './loginModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    nPagination: 1,
  }),
  getters: {
    nPagination: (state) => state.nPagination,
  },
  mutations: {
    SET_PAGINATION(state, data) {
      state.nPagination = data;
    },
  },
  actions: {
    setPagination({ commit }, data) {
      commit('SET_PAGINATION', data);
    }
  },
  modules: {
    login: loginModule,
    article: articleModule,
  }
});
