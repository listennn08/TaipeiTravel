<template>
  <div class="text-center">
    <v-pagination
      :length="nArticleLength"
      v-model="nPagination"
      total-visible="8"
      next-icon="navigate_next"
      prev-icon="navigate_before"
    >
    </v-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Pagination',
  computed: {
    nPagination: {
      get() {
        return this.$store.state.nPagination;
      },
      set(value) {
        this.$store.commit('SET_PAGINATION', value);
      }
    },
    ...mapGetters({
      nArticleLength: 'article/nArticleLength',
    }),
  }
}
</script>

<style>

</style>