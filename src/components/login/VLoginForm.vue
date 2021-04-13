<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>
        Login Form
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-icon="person"
          name="login"
          label="Login"
          type="text"
          v-model="sAccount"
        />
        <v-text-field 
          prepend-icon="lock"
          name="password"
          label="Password"
          type="password"
          v-model="sPassword"
          @keypress.enter="login"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        outlined
        color="primary"
        @click="toggleHasAccount"
      >
        Sign Up
      </v-btn>
      <v-btn
        color="primary"
        @click="login"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import { apiUserLogin } from '@/firebase/auth';

export default {
  data: () => ({
    sAccount: '',
    sPassword: '',
  }),
  methods: {
    ...mapActions({
      toggleHasAccount: 'login/toggleHasAccount',
    }),

    login() {
      if (this.sAccount && this.sPassword) {
        apiUserLogin(this.sAccount, this.sPassword)
          .then((objLoginInfo) => {
            const { status, msg, name, account } = objLoginInfo;
            localStorage.setItem('loginInfo', JSON.stringify({
              status, name, account
            }));
            if (status) {
              this.$router.push('/articles');
            } else {
              this.$emit('alertInfo', {
                type: 'warning',
                icon: 'warning_amber',
                msg,
              });
              this.showAlertMsg();
            }
          })
          .catch((sErrorMsg) => {
            this.$emit('alertInfo', {
              type: 'error',
              icon: 'report',
              msg: sErrorMsg,
            });
            this.showAlertMsg();
          });
      } else {
        this.$emit('alertInfo', {
          type: 'warning',
          icon: 'warning_amber',
          msg: 'Please double check your Account/Password has been typed in or not'
        });

        this.showAlertMsg();
      }
    },
    
    /**
     * 警示窗彈出顯示。
     * @param {number} nUntilMilesec - 顯示秒數，預設 1500ms
     * @returns N/A
     */
    showAlertMsg(nUntilMilesec = 1500) {
        this.$parent.$refs.alert.toggle();
        setTimeout(() => {
            this.$parent.$refs.alert.toggle();
        }, nUntilMilesec);
    },
  },
};
</script>

<style>
</style>
