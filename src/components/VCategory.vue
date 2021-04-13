<template>
  <v-navigation-drawer
    app
    permanent
  >
    <v-sheet
      color="gray lighten-4"
      class="pa-4"
    >
        <v-layout
          align-center
        >
          <v-avatar
            color="primary"
            size="64"
          >
            <span class="white--text headline">
              {{ objCurrentUser.name[0] }}
            </span>
          </v-avatar>
          <router-link 
            :to="`/user/${hashUserId}`"
            class="text-decoration-none black--text link-hover"
          >
            <v-hover v-slot="{ hover }">
              <h5 class="text-h5 ml-3">
                {{ objCurrentUser.name }}
                <v-expand-transition>
                  <v-sheet
                    v-if="hover"
                    color="primary"
                    class="transition-fast-in-fast-out overlay"
                    height="2"
                  ></v-sheet>
                </v-expand-transition>
              </h5>
            </v-hover>
          </router-link>
        </v-layout>
        <div class="text-h6">
          {{ objCurrentUser.account }}
        </div>
      </v-sheet>
      <v-divider />
      <v-list
        class="main-list"
      >
        <v-list-item-group
          mandatory
          :value="nFilterIndex"
          color="primary"
        >
          <v-list-item
            v-for="category in aCategories"
            :key="category"
            link
            @click.prevent="changeFilter(category)"
          >
            <v-list-item-content>
              {{ category }}
            </v-list-item-content>
          </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { MD5 } from 'crypto-js';

export default {
  props: {
      objCurrentUser: {
        type: Object,
      }
  },
  computed: {
    ...mapGetters({
      aCategories: 'article/aCategories',
      nFilterIndex: 'article/nFilterIndex',
    }),
    hashUserId() {
      return MD5(this.objCurrentUser.id).toString();
    }
  },
  methods: {
    ...mapActions({
      changeFilter: 'article/changeFilter',
    }),
  },
}
</script>

<style>
.overlay {
  position: absolute;
  width: 20%;
}
</style>