<template>
  <v-layout align-center justify-center>
    <v-card
      min-width="450"
    >
      <v-sheet
        color="gray lighten-4"
        class="pa-4 d-flex align-center justify-center"
      >
        <v-avatar
          color="primary"
          size="64"
        >
          <span class="white--text headline">
            {{ objCurrentUser.name[0] }}
          </span>
        </v-avatar>
      </v-sheet>
      <v-card-title class="text-center">
        {{ objCurrentUser.account }}
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-text-field
            label="Name"
            :value="objCurrentUser.name"
            hide-details="auto"
            @change="changeName"
          />
          <v-text-field
            label="New Password"
            v-model="objNewPassword.value"
            hide-details="auto"
            type="password"
          />
          <v-text-field
            label="New Password Confirm"
            v-model="objNewPassword.confirm"
            :rules="[checkPassword]"
            hide-details="auto"
            type="password"
          />
          <v-text-field
            label="Password"
            v-model="sPassword"
            hide-details="auto"
            type="password"
          />
        </v-list>
      </v-card-text>

      <v-card-actions
        class="justify-center"
      >
        <v-btn
          @click="$router.push('/articles')"
        >
          Back
        </v-btn>
        <v-btn
          @click="saveChange"
        >
          Change Profile
        </v-btn>
      </v-card-actions>
    </v-card>
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
import { apiChangeProfile } from '@/firebase/auth';

export default {
  name: 'User',
  data: () => ({
    objCurrentUser: {},
    sNewName: '',
    objNewPassword: {
      value: '',
      confirm: '',
    },
    sPassword: '',
    objAlert: {
      sType: 'warning',
      sIcon: 'warning_amber',
      sMsg: '',
      bShow: false,
    },
  }),
  created() {
    this.objCurrentUser = JSON.parse(localStorage.getItem('loginInfo'));
    if (!this.objCurrentUser) {
      this.$router.push('/login');
    }
  },
  methods: {
    /**
     * 當名稱有更改時，將變數新增至 sNewName。
     * 
     * @param {string} val 更改之名稱
     */
    changeName(val) {
      this.sNewName = val;
    },
    
    /**
     * 檢測密碼與確認密碼欄位是否相同。
     * 
     * @returns {string|boolean} 相同回傳 true 如不相同則會回傳錯誤訊息。
     */
    checkPassword() {
      let sErrorMsg = '';
      if (this.objNewPassword.value && this.objNewPassword.confirm) {
        sErrorMsg = (this.objNewPassword.value === this.objNewPassword.confirm)
          ? true 
          : 'Password is not match';
      }
      return sErrorMsg;
    },

    /**
     * 送出更改之個人資料。
     */
    saveChange() {
      const { account } = JSON.parse(localStorage.getItem('loginInfo'));
      const objChangeInfo = {};
      if (this.sNewName) {
        objChangeInfo.name = this.sNewName;
      }
      if (this.objNewPassword.value) {
        objChangeInfo.password = this.objNewPassword.value;
      }
      if (Object.keys(objChangeInfo).length > 0) {
        apiChangeProfile(account, this.sPassword, objChangeInfo)
          .then((objChangedInfo) => {
            const { status, msg, data } = objChangedInfo;
            if (status) {
              localStorage.setItem('loginInfo', JSON.stringify({
                account,
                ...data,
              }));
              this.objAlert.sType = 'success';
              this.objAlert.sIcon = 'check_circle';
              this.objAlert.sMsg = msg;
            } else {
              this.objAlert.sType = 'error';
              this.objAlert.sIcon = 'report';
              this.objAlert.sMsg = msg;
            }
            this.showAlertMsg();
          });
      }
    },

    /**
     * 警示窗彈出顯示。
     * @param {number} nUntilMilesec - 顯示秒數，預設 1500ms
     * @returns N/A
     */
    showAlertMsg(nUntilMilesec = 1500) {
      this.$refs.alert.toggle();
      setTimeout(() => {
        this.$refs.alert.toggle();
      }, nUntilMilesec);
    },
  }
};
</script>

<style>
.text-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-enter-active, .action-leave-active {
  display: flex;
  justify-content: center;
  transition: opacity .2s, transform .2s;
}

.action-enter, .action-leave-to {
  opacity: 0;
  transform: translate(0, 20px);
}
.v-alert {
  position: absolute;
}
</style>