export default {
  namespaced: true,
  state: () => ({
    bArticleLoading: false,
    aArticles: [],
    aCategories: [],
    sFilter: '',
    nFilterIndex: 0,
    objCategoryColor: {
      "養生溫泉": "#B0C4DE",
      "藍色公路": "blue",
      "歷史建築": "brown",
      "藝文館所": "#DC143C",
      "單車遊蹤": "darkgreen",
      "戶外踏青": "green",
      "宗教信仰": "brown",
      "其　　他": "secondary",
      "親子共遊": "#228B22",
      "公共藝術": "pink",
      "春季活動": "#FFB6C1",
    },
  }),

  getters: {
    bArticleLoading: (state) => state.bArticleLoading,

    /**
     * 使用文章類別篩選文章。
     * 
     * @returns 篩選過後之文章陣列
     */
    filterArticles: (state) => {
      if (state.sFilter) {
        return state.aArticles
          .filter((objArticle) => {
            return objArticle.category.some((el) => el.name.includes(state.sFilter));
          });
      }
      return state.aArticles;
    },

    filterArticlesLimit: (state, getters, rootState, rootGetters) => {
      const { nPagination } = rootGetters;
      return getters.filterArticles.slice((nPagination - 1) * 10, nPagination * 10);
    },

    /**
     * 取得指定文章。
     * 
     * @param {string} id 文章 id
     * @returns {object} 文章
     */
    article: (state) => (id) => state.aArticles.filter((article) => article.id === Number(id))[0],
    aCategories: (state) => state.aCategories,
    sFilter: (state) => state.sFilter,
    nFilterIndex: (state) => state.nFilterIndex,
    nArticleLength: (state, getters) => Math.ceil(getters.filterArticles.length / 10),
    objCategoryColor: (state) => state.objCategoryColor,
  },

  actions: {
    toggleArticleLoading({ commit }) {
      commit('TOGGLE_ARTICLELOADING');
    },

    setArticles({ commit }, data) {
      commit('SET_ARTICLES', data);
    },

    setCategories({ commit }, data) {
      commit('SET_CATEGORIES', data);
    },

    /**
     * 改變篩選條件。
     * 
     * @param {string} sCurrentFilter
     * @returns N/A
     */
    changeFilter({ commit, rootState }, data) {
      commit('CHANGE_FILTER', { rootState, data });
    }
  },

  mutations: {
    TOGGLE_ARTICLELOADING(state) {
      state.bArticleLoading = !state.bArticleLoading;
    },

    SET_ARTICLES(state, data) {
      state.aArticles = data;
    },

    SET_CATEGORIES(state, data) {
      state.aCategories = ['所有景點', ...data];
    },

    CHANGE_FILTER(state, { rootState, data }) {
      state.sFilter = data === '所有景點' ? '' : data;
      rootState.nPagination = 1;
      state.nFilterIndex = state.aCategories
        .findIndex((category) => category === state.sFilter);
    },
  },
};
