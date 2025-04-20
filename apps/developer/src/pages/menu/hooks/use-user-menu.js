import { useState, useEffect } from 'react';

import {
  createMenu,
  fetchMenuList,
  removeMenu,
  updateMenu,
} from '@/api/api-menu';

import { ROOT_MENU_PID } from '@/config';

import { useMenuTreeQuery } from './use-user-tree';

const initialRootMenuObject = {
  // 菜单pid
  pid: ROOT_MENU_PID,
  // 菜单key
  key: ROOT_MENU_PID,
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
  // current root menu object, also act as the parent menu object!
  const [parentMenuObject, setParentMenuObject] = useState(
    initialRootMenuObject
  );

  const [isChildMenuModalOpen, setIsChildMenuModalOpen] = useState(false);
  const [childMenuObject, setChildMenuObject] = useState({
    pid: '',
    title: '',
    type: 'internal_link',
    value: '',
    icon: '',
    sort: 0,
    status: 1,
  });

  // sub-menu tree
  const { loadTreeBy, treeSelectData } = useMenuTreeQuery();

  /**
   * show child menu modal, and set parent menu object
   * @param {*} node menu node data
   */
  const showChildMenuModal = node => {
    setIsChildMenuModalOpen(true);
    // set parent menu object
    setParentMenuObject(node);
  };

  const showEditChildMenu = node => {
    // show edit child menu modal, and set child menu object
    setChildMenuObject(node);
  };

  const showDeleteChildMenu = node => {
    // show delete child menu modal, and set child menu object
    setChildMenuObject(node);
  };

  const closeChildMenuModal = () => {
    setIsChildMenuModalOpen(false);
  };

  const handleChildMenuObjectChange = (key, value) => {
    setChildMenuObject({ ...childMenuObject, [key]: value });
  };

  const handleChildMenuCreation = async () => {
    setIsChildMenuModalOpen(false);
    await createMenu({ ...childMenuObject, pid: parentMenuObject.key });
    // TODO: refresh sub-menu tree ...
    const res = await loadTreeBy(ROOT_MENU_PID);
    setMenuList(res);
  };

  const handleDeleteChildMenu = async menuId => {
    // await removeMenu(menuId);
    // TODO: refresh sub-menu tree ...
    // const res = await loadTreeBy();
    // setMenuList(res);
  };

  const handleEditChildMenu = async menuId => {
    // await updateMenu(menuId);
    // TODO: refresh sub-menu tree ...
    // const res = await loadTreeBy();
    // setMenuList(res);
  };

  useEffect(() => {
    fetchMenuListUnderRoot().then(res => {
      setMenuList(res);
    });
  }, []);

  return {
    menuList,
    isRootMenuModalOpen,
    isChildMenuModalOpen,
    childMenuObject,
    treeSelectData,
    closeChildMenuModal,
    showChildMenuModal,
    showEditChildMenu,
    showDeleteChildMenu,
    handleChildMenuCreation,
    handleChildMenuObjectChange,
    handleDeleteChildMenu,
    handleEditChildMenu,
  };
};
