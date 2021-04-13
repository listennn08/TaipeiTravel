<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-login-form
        v-if="bHasAccount"
        @alertInfo="handleAlertInfo"
      />
      <v-sign-up-form 
        v-else
        @alertInfo="handleAlertInfo"
      />
    </v-flex>
    <v-alert 
      ref="alert"
      :type="objAlert.sType"
      :icon="objAlert.sIcon"
      :value="objAlert.bShow"
      transition="scale-transition" 
    >
      {{ objAlert.sMsg }}
    </v-alert>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import VSignUpForm from '@/components/login/VSignUpForm.vue';
import VLoginForm from '@/components/login/VLoginForm.vue';

export default {
  name: 'Login',
  components: {
    VSignUpForm,
    VLoginForm,
  },
  data: () => ({
    objAlert: {
      bShow: false,
      sMsg: '',
      sIcon: 'check_circle',
      sType: 'success',
    }
  }),
  computed: {
      ...mapGetters({
          bHasAccount: 'login/bHasAccount',
      })
  },
  created() {
    const objLoginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    if (objLoginInfo) {
      const { status } = objLoginInfo;
      if (status) {
        this.$router.push('/articles');
      }
    }
  },
  methods: {
    /**
     * 取得子組件傳出的彈出視窗資訊。
     * 
     * @param {object} objMsgInfo 彈出視窗資訊
     * @param {string} objMsgInfo.msg 彈出視窗訊息
     * @param {string} objMsgInfo.icon 彈出視窗圖示
     * @param {string} objMsgInfo.type 彈出視窗類型
     */
    handleAlertInfo(objMsgInfo) {
      this.objAlert.sMsg = objMsgInfo.msg;
      this.objAlert.sIcon = objMsgInfo.icon;
      this.objAlert.sType = objMsgInfo.type; 
    }
  }
}
</script>

<style>
.v-alert {
  position: absolute;
}
</style>