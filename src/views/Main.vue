<template>
  <v-layout>
    <VCategory
      :objCurrentUser="objCurrentUser"
    />
    <router-view></router-view>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';
import VCategory from '@/components/VCategory.vue';

export default {
  name: 'Main',
  components:{
    VCategory,
  },
  data: () => ({
    objCurrentUser: {},
  }),
  created() {
    this.objCurrentUser = JSON.parse(localStorage.getItem('loginInfo'));
    if (this.objCurrentUser) {
      if (this.objCurrentUser.status) {
        this.getData();
        return;
      }
    }
    this.$router.push('/login');
  },
  methods: {
    ...mapActions({
      toggleArticleLoading: 'article/toggleArticleLoading',
      setArticles: 'article/setArticles',
      setCategories: 'article/setCategories',
    }),
    /**
     * 取得文章資料。
     * 
     * @returns N/A
     */
    getData() {
      const aCategories = [];
      this.toggleArticleLoading();
      axios
        .get('https://raw.githubusercontent.com/listennn08/jsonData/master/data.json')
        .then((jsonResult) => {
          const objData =  jsonResult.data.data.map((objArticle) => {
            // objArticle.file = objArticle.file
            //   .split('http')
            //   .filter((sFilePath) => sFilePath)
            //   .map((sFilePath) => `http${sFilePath}`);
            
            objArticle.category.forEach((el) => {
              if (aCategories.indexOf(el.name) === -1) {
                aCategories.push(el.name);
              }
            });

            return objArticle;
          });

          this.setArticles(objData);
          this.setCategories(aCategories);
          this.toggleArticleLoading();
        });
    },
  }
};
</script>

<style lang="scss">
.main-list {
  min-height: 75vh;
  max-height: 75vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>