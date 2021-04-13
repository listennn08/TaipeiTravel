export default {
  namespaced: true,
  state: () => ({
    bHasAccount: true,
  }),
  getters: {
    bHasAccount: (state) => state.bHasAccount,
  },
  actions: {
    toggleHasAccount({ commit }) {
      commit('TOGGLE_HAS_ACCOUNT');
    },
  },
  mutations: {
    TOGGLE_HAS_ACCOUNT(state) {
      state.bHasAccount = !state.bHasAccount;
    },
  },
};