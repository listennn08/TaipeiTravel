import db from '../core';

const dbUser = db.collection('users');

/**
 * 與 firebase 確認帳號是否存在。
 * 
 * @param {string} sAccount - 帳號
 * @returns {boolean} 是否存在
 */
export const apiCheckAccountAlreadyExist = async (sAccount) => {
  const user = await dbUser.doc(sAccount).get();
  if (user.data()) {
    return true;
  }
  return false;
};

/**
 * 在 firebase 新增使用者資料。
 * 
 * @param {object} objUserInfo - 使用者資料
 * @param {string} objUserInfo.sAccount - 使用者帳號
 * @param {string} objUserInfo.sPassword - 使用者密碼
 * @param {string} objUserInfo.sName - 使用者名稱
 * @returns 註冊完成回傳資料
 */
export const apiUserSignUp = async ({
  sAccount,
  sPassword,
  sName,
}) => {
  await dbUser.doc(sAccount).set({
    password: sPassword,
    name: sName,
  });
  const pReturnInfo = await dbUser.doc(sAccount).get();
  return pReturnInfo.data();
};

/**
 * 登入帳號資訊。
 * 
 * @param {string} sAccount - 帳號
 * @param {string} sPassword - 密碼
 * @returns 登入成功回傳登入狀態
 * @example
 *     {
 *          status: success,
 *          msg: msg,
 *          name: name
 *     }
 */
export const apiUserLogin = async (sAccount, sPassword) => {
  const fbUser = await dbUser.doc(sAccount).get();
  if (fbUser.data()) {
    const sPwd = fbUser.data().password;
    if (sPwd === sPassword) {
      return {
        status: true,
        msg: 'Login successful!',
        account: fbUser.id,
        name: fbUser.data().name,
      };
    } else {
      return {
        status: false,
        msg: 'Account or Password is wrong!',
      };
    }
  } else {
    return {
      status: false,
      msg: 'Account or Password is wrong!',
    }
  }
};

/**
 * 更改個人資料。
 * 
 * @param {string} sAccount - 帳號
 * @param {string} sPassword - 密碼
 * @param {object} objChangeProfileData - 更改資料
 * @returns objChangedStatus - 更改狀態
 */
export const apiChangeProfile = async (sAccount, sPassword, objChangeProfileData) => {
  const fbUser = await dbUser.doc(sAccount).get();
  if (fbUser.data()) {
    const { password } = fbUser.data();
    if (sPassword === password) {
      await dbUser.doc(sAccount).set({ ...objChangeProfileData });

      const objChangedProfileData = await dbUser.doc(sAccount).get();
      delete objChangeProfileData.password;
      return {
        status: true,
        msg: 'Change Profile successful!',
        data: objChangedProfileData.data(),
      };
    }
  }

  return {
    status: false,
    msg: 'Havn\'t user data or password is wrong!',
  };
}