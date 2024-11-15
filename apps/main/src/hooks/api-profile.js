import useFetchData from './useFetchData';
import usePostData from './usePostData';
import usePutData from './usePutData';
import useDeleteData from './useDeleteData';

/**
 * 查询我的信息
 * @param {*} id 
 * @returns {*} {data:{返回结果记录为字典}}
 */
export const fecthMyProfile = () => {
  const { data, error, loading } = useFetchData(`/api/sys/profiles/mine`);
  return { data, error, loading };
};

/** 
 * 修改我的信息
 */
export const modifyMyProfile = (username, avatar, title, description) => {
  const { data, error, loading } = usePutData(`/api/sys/profiles/mine`, {
    username: username,
    avatar: avatar,
    title: title,
    description: description,
  });
  return { data, error, loading };
};

/**
 * 查询某个账号的信息
 * @param {*} id 
 * @returns {*} {data:{返回结果记录为字典}}
 */
export const fecthProfile = (accountId) => {
  const { data, error, loading } = useFetchData(`/api/sys/profiles/${accountId}`);
  return { data, error, loading };
};