<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Sign-Up Form</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form
        ref="signUp"
        v-model="bFormValid"
      >
        <v-text-field
          class="mt-required"
          v-model="objAccount.value"
          :rules="objAccount.aRules"
          label="Account"
          placeholder="Account@mail.com"
          @blur="checkAccountAlreadyExist"
          :error-messages="objAccount.errorMsg"
          type="email"
          required
        >
          <template 
            #append
            v-if="objAccount.checking"
          >
            <v-progress-circular
              indeterminate
              color="primary"
              size="20"
            />
          </template>
        </v-text-field>
        <v-text-field
          class="mt-required"
          v-model="objPassword.value"
          :rules="[objPassword.fnRule]"
          label="Password"
          type="password"
          placeholder="Please type your password"
          required
        />
        <v-text-field
          class="mt-required"
          v-model="objPassword.confirm"
          :rules="[objPassword.fnConfirmRule, checkPassword]"
          label="Password Confirm"
          type="password"
          placeholder="Please type your password again"
          required
        />
        <v-text-field
          class="mt-required"
          v-model="objName.value"
          :rules="[objName.fnRule]"
          label="Name"
          placeholder="Please type your name"
          required
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
        Sign in
      </v-btn>
      <v-btn 
        color="primary"
        :disabled="!bFormValid"
        @click="signUpUser"
      >
        Sign up
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import { apiCheckAccountAlreadyExist, apiUserSignUp } from '@/firebase/auth';

export default {
  data: () => ({
    objAccount: {
      value: '',
      aRules: [
        (account) => !!account || 'Account is required!',
      ],
      errorMsg: [],
      checking: false,
    },
    objPassword: {
      value: '',
      confirm: '',
      fnRule: (password) => !!password || 'Password is required!',
      fnConfirmRule: (password) => !!password || 'Password Confirm is required!',
    },
    objName: {
      value: '',
      fnRule: (name) => !!name || 'Name is required',
    },
    bFormValid: false,
  }),
  methods: {
    ...mapActions({
      toggleHasAccount: 'login/toggleHasAccount',
    }),

    /**
     * 確認帳號是否已經存在。
     * 
     * @returns N/A 
     */
    async checkAccountAlreadyExist() {
      if (this.objAccount.value) {
        this.objAccount.checking = true;
        const bAccountExist = await apiCheckAccountAlreadyExist(this.objAccount.value);
        this.objAccount.errorMsg =  bAccountExist 
          ? [`Account '${this.objAccount.value}' is already exist. Please change account`]
          : [];
        this.objAccount.checking = false;
      }

      return 'Account is required!';
    },

    /**
     * 檢測密碼與確認密碼欄位是否相同。
     * 
     * @returns {string|boolean} 相同回傳 true 如不相同則會回傳錯誤訊息。
     */
    checkPassword() {
      let sErrorMsg = '';
      if (this.objPassword.value && this.objPassword.confirm) {
        sErrorMsg = (this.objPassword.value === this.objPassword.confirm)
          ? true 
          : 'Password is not match';
      }
    
      return sErrorMsg;
    },

    /**
     * 驗證註冊資料且註冊。
     * @returns N/A
     */
    signUpUser() {
      if(this.$refs.signUp.validate()) {
        apiUserSignUp({
          sAccount: this.objAccount.value,
          sPassword: this.objPassword.value,
          sName: this.objName.value
        })
          .then((bSignUpResult) => {
            if (bSignUpResult) {
              this.$emit('alertInfo', {
                msg: 'Sign-up is successful!',
                type: 'success',
                icon: 'check_circle',
              });
              this.showAlertMsg(2000);
              this.toggleHasAccount();
            } else {
              this.$emit('alertInfo', {
                msg: 'Sign-up is failure!',
                type: 'warning',
                icon: 'warning_amber'
              });
              this.showAlertMsg();
            }
          })
          .catch((errorMsg) => {
            this.$emit('alertInfo', {
              msg: errorMsg,
              type: 'error',
              icon: 'report',
            });
          });
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
}
</script>

<style>

</style>