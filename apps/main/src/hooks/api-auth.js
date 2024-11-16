// import { useFetchData } from './use-fetch-data';
import { usePostData } from './use-post-data';
// import { usePutData } from './use-put-data';
import { useDeleteData } from './use-delete-data';

/**
 * 登录
 * @param {*} loginName
 * @param {*} password 请使用md5(pwd)加密后传入此参数
 * @returns
 */
export const useLogin = (loginName, password) => {
  const { data, error, loading } = usePostData(`/api/auth/v5/login`, {
    username: loginName,
    password: password,
  });
  localStorage.setItem('formas.jwt', data);
  return { data, error, loading };
};

/**
 * 登出
 */
export const useLogout = () => {
  const { data, error, loading } = useDeleteData(`/api/auth/v5/logout`);
  return { data, error, loading };
};

/**
 * 修改密码
 * @param {*} oldPwd 请使用md5(pwd)加密后传入此参数
 * @param {*} newPwd 请使用md5(pwd)加密后传入此参数
 * @returns
 */
export const useChangePassword = (oldPwd, newPwd) => {
  const { data, error, loading } = usePostData(`/api/auth/v5/change-pwd`, {
    oldPwd: oldPwd,
    newPwd: newPwd,
  });
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
    `/api/auth/v5/signup/verify-code`,
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
  const { data, error, loading } = usePostData(`/api/auth/v5/signup`, {
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
    `/api/auth/v5/lostpwd/verify-code`,
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
  const { data, error, loading } = usePostData(`/api/auth/v5/lostpwd`, {
    loginName: loginName,
    type: type,
    code: code,
    md5pwd: password,
  });
  return { data, error, loading };
};
