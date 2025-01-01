import { md5 } from 'js-md5';

import { usePostData, useDeleteData, SERVICE_GATE_API as host } from '.';

/**
 * 登录
 * @param {string} loginName
 * @param {string} password normal password to encrypt with MD5
 * @returns
 */
export const useLogin = (loginName, password) => {
  const md5pwd = md5(password);
  const { data, error, loading, trigger } = usePostData(
    `${host}/api/auth/v5/login`,
    {
      loginName,
      md5pwd, // 请使用md5(pwd)加密后传入此参数
    }
  );
  const send = async () => {
    const result = await trigger();
    const { data } = result;
    // got token:
    if (data) {
      localStorage.setItem('formas.jwt', data);
    } else {
      console.warn(`## login failed, no token returned!`);
    }
    return result;
  };
  return { data, error, loading, send };
};

/**
 * 登出
 */
export const useLogout = () => {
  const { data, error, loading } = useDeleteData(`${host}/api/auth/v5/logout`);
  return { data, error, loading };
};

/**
 * 修改密码
 * @param {*} oldPwd 请使用md5(pwd)加密后传入此参数
 * @param {*} newPwd 请使用md5(pwd)加密后传入此参数
 * @returns
 */
export const useChangePassword = (oldPwd, newPwd) => {
  const { data, error, loading } = usePostData(
    `${host}/api/auth/v5/change-pwd`,
    {
      oldPwd: oldPwd,
      newPwd: newPwd,
    }
  );
  return { data, error, loading };
};

/**
 * 发送注册账号验证码
 * @param {*} loginName
 * @param {*} type 类型: phone,email
 * @returns
 */
export const useSendSignupCaptcha = (loginName, type) => {
  const { data, error, loading } = usePostData(
    `${host}/api/auth/v5/signup/verify-code`,
    {
      loginName: loginName,
      type: type,
    }
  );
  return { data, error, loading };
};

/**
 * 注册账号
 * @param {*} loginName
 * @param {*} type 类型: username,phone,email,wx,dingtalk
 * @param {*} code 验证码
 * @param {*} password 请使用md5(pwd)加密后传入此参数
 * @returns
 */
export const useSignup = (loginName, type, code, password) => {
  const { data, error, loading } = usePostData(`${host}/api/auth/v5/signup`, {
    loginName: loginName,
    type: type,
    code: code,
    md5pwd: password,
  });
  return { data, error, loading };
};

/**
 * 发送丢失密码验证码
 * @param {*} loginName
 * @param {*} type 类型: phone,email
 * @returns
 */
export const useSendLostpwdCaptcha = (loginName, type) => {
  const { data, error, loading } = usePostData(
    `${host}/api/auth/v5/lostpwd/verify-code`,
    {
      loginName: loginName,
      type: type,
    }
  );
  return { data, error, loading };
};

/**
 * 丢失密码，重置密码
 * @param {*} loginName
 * @param {*} type 类型: phone,email
 * @param {*} code 验证码
 * @param {*} password 请使用md5(pwd)加密后传入此参数
 * @returns
 */
export const useLostpwd = (loginName, type, code, password) => {
  const { data, error, loading } = usePostData(`${host}/api/auth/v5/lostpwd`, {
    loginName: loginName,
    type: type,
    code: code,
    md5pwd: password,
  });
  return { data, error, loading };
};
