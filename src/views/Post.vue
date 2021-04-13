<template>
  <div>
    <v-btn
      fab
      icon
      tile
      absolute
      @click="$router.go(-1)"
    >
      <v-icon>
        keyboard_backspace
      </v-icon>
    </v-btn>
    <v-row dense>
      <v-col
        cols="10"
        offset="1"
      >
        <v-card
          max-width="1200"
        >
          
          <v-carousel
            cycle
            show-arrows-on-hover
            hide-delimiter-background
            hide-delimiters
            delimiter-icon="minus"
            height="300"
            next-icon="navigate_next"
            prev-icon="navigate_before"
          >
            <v-carousel-item
              v-for="img in article($route.params.id).images"
              :key="img.src"
              :src="img"
            >
            </v-carousel-item>
          </v-carousel>
          <v-card-title>
            {{ article($route.params.id).name }}
            <v-chip-group class="ml-auto">
              <template v-for="cat in article($route.params.id).category">
                <v-chip
                  :key="cat.name"
                  label
                  outlined
                  :color="objCategoryColor[cat.name]"
                >
                  {{ cat.name }}
                </v-chip>
              </template>
            </v-chip-group>
          </v-card-title>
          <v-card-text>
            <p v-html="replaceHTML(article($route.params.id).introduction)"></p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Post',
  computed: {
    ...mapGetters({
      article: 'article/article',
      objCategoryColor: 'article/objCategoryColor',
    }),
  },
  methods: {
    replaceHTML: (val) => val ? val.replace(/\r\n/g, '<br>') : '',
  },
};
</script>

<style>

</style>