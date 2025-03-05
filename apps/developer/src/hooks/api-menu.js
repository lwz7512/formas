import { SERVICE_GATE_API as host } from '@/config';
import {
  vanillaPostData,
  vanillaDeleteData,
  vanillaPutData,
  vanillaGetData,
} from '.';

/**
 * 查询我的菜单树
 * @returns {Promise} form list
 */
export const fetchMyMenuTree = async () => {
  const result = await vanillaGetData(`${host}/api/formas/menus/mine`);
  return result;
};

/**
 * 查询菜单列表
 * @returns {Promise} form list
 */
export const fetchMenuList = async menuId => {
  const result = await vanillaGetData(
    `${host}/api/formas/menus/${menuId}/table`
  );
  return result;
};

/**
 * 查询菜单树
 * @returns {Promise} form list
 */
export const fetchMenuTree = async menuId => {
  const result = await vanillaGetData(
    `${host}/api/formas/menus/${menuId}/tree`
  );
  return result;
};

/**
 * 创建菜单
 * @param {{pid: string, title: string, type: string, value: string}} item
 */
export const createMenu = async item => {
  const { pid, title, type, value } = item;
  const result = await vanillaPostData(`${host}/api/formas/menus`, {
    pid: pid,
    title: title,
    type: type,
    value: value,
  });
  return result;
};

/**
 * 修改菜单
 */
export const updateMenu = async item => {
  const result = await vanillaPutData(`${host}/api/formas/menus/${item.key}`, {
    title: item.title,
    note: item.type,
    sequence: item.value,
  });
  return result;
};

/**
 * 删除菜单
 * @param {string} key dataview id
 */
export const removeMenu = async key => {
  const result = await vanillaDeleteData(`${host}/api/formas/menus/${key}`);
  return result;
};
