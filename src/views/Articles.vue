<template>
  <v-col
    cols="10"
  >
    <v-row
      dense
      class="mb-1"
      justify="center"
    >
      <v-col
        cols="1"
        v-if="bArticleLoading"
        align-self="center"
      >
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        />
      </v-col>
      <v-col
        v-else
        cols="10"
        v-for="objArticle in filterArticlesLimit"
        :key="objArticle.id"
        class="mb-2 mx-auto"
      >
        <v-card
          hover
          :to="`/article/${objArticle.id}`"
        >
          <v-img
            :src="`${objArticle.images[0].src}`"
            height="200px"
          />
          <v-card-title>
            {{ objArticle.name }}
            <v-spacer />
            <template v-for="(cat, index) in objArticle.category">
              <v-chip
                :key="`${cat}${index}${Math.random()}`"
                class="ml-2"
                label
                outlined
                small
                :color="objCategoryColor[cat.name]"
              >
                {{ cat.name }}
              </v-chip>
            </template>
          </v-card-title>
          <v-card-text>
            {{ hideTooLongText(objArticle.introduction) }}...
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <router-link 
              :to="`/article/${objArticle.id}`"
              class="text-decoration-none"
            >
              繼續閱讀
              <v-icon x-small color="primary">
                double_arrow
              </v-icon>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <VcPagination />
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex';
import VcPagination from '@/components/VPagination.vue';

export default {
  name: 'Article',
  components: {
    VcPagination,
  },
  data: () => ({
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
  computed: {
    ...mapGetters({
      bArticleLoading: 'article/bArticleLoading',
      filterArticlesLimit: 'article/filterArticlesLimit',
      sFilter: 'article/sFilter',
    }),

    /**
     * 隱藏過長文字介紹。
     * 
     * @param {string} sArticleInfo 文章簡介
     * @returns string
     */
    hideTooLongText() {
      return (text) => {
        if (text) {
          return text.length > 50
            ? text.substring(0, 50)
            : text;
        }
        return text;
      }
    }
  },
}
</script>

<style lang="scss">
</style>