import httpClient from '../utils/http-client';

/**
 * 查询我的菜单树
 * @returns {Promise} form list
 */
export const fetchMyMenuTree = async () => {
  try {
    const result = await httpClient.get('/formas/menus/mine');
    return result;
  } catch (error) {
    console.error('获取我的菜单树失败:', error);
    throw error;
  }
};

/**
 * 查询菜单列表
 * @returns {Promise} form list
 */
export const fetchMenuList = async menuId => {
  try {
    const result = await httpClient.get(`/formas/menus/${menuId}/table`);
    return result;
  } catch (error) {
    console.error('获取菜单列表失败:', error);
    throw error;
  }
};

/**
 * 查询菜单树
 * TODO: 需要根据菜单id查询菜单树, where to get the menuId?
 * @param {string} menuId 菜单id
 * @returns {Promise} form list
 */
export const fetchMenuTree = async menuId => {
  try {
    const result = await httpClient.get(`/formas/menus/${menuId}/tree`);
    return result;
  } catch (error) {
    console.error('获取菜单树失败:', error);
    throw error;
  }
};

/**
 * 创建菜单
 * type: 菜单类型, 1: internal_link, 2: external_link,
 * value is url
 * TODO: where to get the top pid? - ROOT_MENU_PID
 * @param {{pid: string, title: string, type: string, value: string, note: string}} item
 */
export const createMenu = async item => {
  const { pid, title, type, value, note } = item;
  try {
    const result = await httpClient.post('/formas/menus', {
      pid,
      title,
      type,
      value,
      note,
    });
    return result;
  } catch (error) {
    console.error('创建菜单失败:', error);
    throw error;
  }
};

/**
 * 修改菜单
 */
export const updateMenu = async item => {
  try {
    const result = await httpClient.put(`/api/formas/menus/${item.key}`, {
      title: item.title,
      note: item.type,
      sequence: item.value,
    });
    return result;
  } catch (error) {
    console.error('修改菜单失败:', error);
    throw error;
  }
};

/**
 * 删除菜单
 * @param {string} key dataview id
 */
export const removeMenu = async key => {
  try {
    const result = await httpClient.delete(`/api/formas/menus/${key}`);
    return result;
  } catch (error) {
    console.error('删除菜单失败:', error);
    throw error;
  }
};
