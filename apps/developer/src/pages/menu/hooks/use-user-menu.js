import { useState, useEffect } from 'react';

import { createMenu, fetchMenuList, fetchMenuTree } from '@/api/api-menu';

import { ROOT_MENU_PID } from '@/config';

const initialRootMenuObject = {
  // 菜单pid
  pid: ROOT_MENU_PID,
  // 菜单名称 必填
  title: '',
  // 菜单类型 必填
  type: 'internal_link',
  // 菜单链接 必填
  value: '',
  // 菜单图标
  icon: '',
  // 菜单排序
  sort: 0,
  // 菜单状态
  status: 1,
  // 菜单备注
  note: '',
};

const fetchMenuListUnderRoot = async () => {
  const res = await fetchMenuList(ROOT_MENU_PID);
  return res.datas.filter(item => item.pid === ROOT_MENU_PID);
};

/**
 * user menu management
 * @date 2025/04/10
 */
export const useUserMenu = () => {
  const [menuList, setMenuList] = useState([]);
  const [isRootMenuModalOpen, setIsRootMenuModalOpen] = useState(false);
  const [rootMenuObject, setRootMenuObject] = useState(initialRootMenuObject);

  const showRootMenuModal = () => {
    setIsRootMenuModalOpen(true);
  };

  const closeRootMenuModal = () => {
    setIsRootMenuModalOpen(false);
  };

  /**
   * 创建根菜单
   * @date 2025/04/13
   */
  const handleRootMenuCreation = async () => {
    setIsRootMenuModalOpen(false);
    await createMenu(rootMenuObject);
    const res = await fetchMenuListUnderRoot();
    setMenuList(res);
  };

  /**
   * 修改根菜单
   * @date 2025/04/13
   */
  const handleMenuObjectChange = (key, value) => {
    setRootMenuObject({ ...rootMenuObject, [key]: value });
  };

  useEffect(() => {
    fetchMenuListUnderRoot().then(res => {
      setMenuList(res);
    });
  }, []);

  return {
    menuList,
    rootMenuObject,
    isRootMenuModalOpen,
    showRootMenuModal,
    closeRootMenuModal,
    handleRootMenuCreation,
    handleMenuObjectChange,
  };
};
