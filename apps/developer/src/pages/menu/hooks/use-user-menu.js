import { useState } from 'react';

import { createMenu, updateMenu, removeMenu } from '@/api/menu';

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

/**
 * user menu management
 * @date 2025/04/10
 */
export const useUserMenu = () => {
  // current root menu object, also act as the parent menu object!
  const [parentMenuObject, setParentMenuObject] = useState(
    initialRootMenuObject
  );

  const [isChildMenuModalOpen, setIsChildMenuModalOpen] = useState(false);
  const [isEditChildMenuModalOpen, setIsEditChildMenuModalOpen] =
    useState(false);

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

  /**
   * show edit child menu modal, and set child menu object
   * @param {*} node menu node data
   */
  const showEditChildMenu = node => {
    setIsEditChildMenuModalOpen(true);
    // show edit child menu modal, and set child menu object
    setChildMenuObject(node);
  };

  const closeChildMenuModal = () => {
    setIsChildMenuModalOpen(false);
    setIsEditChildMenuModalOpen(false);
  };

  const handleChildMenuObjectChange = (key, value) => {
    setChildMenuObject({ ...childMenuObject, [key]: value });
  };

  // 修改刷新逻辑
  const refreshMenuTree = async () => {
    await loadTreeBy(ROOT_MENU_PID);
  };

  /**
   * == Create child menu ==
   */
  const handleChildMenuCreation = async () => {
    setIsChildMenuModalOpen(false);
    await createMenu({
      ...childMenuObject,
      pid: parentMenuObject ? parentMenuObject.key : ROOT_MENU_PID,
    });
    await refreshMenuTree();
  };

  /**
   * == Update child menu ==
   */
  const handleEditChildMenu = async () => {
    await updateMenu(childMenuObject);
    await refreshMenuTree();
    closeChildMenuModal();
  };

  const handleDeleteChildMenu = async (menuNode) => {
    await removeMenu(menuNode.key);
    await refreshMenuTree();
  };

  return {
    isChildMenuModalOpen,
    isEditChildMenuModalOpen,
    childMenuObject,
    treeSelectData,
    closeChildMenuModal,
    showChildMenuModal,
    showEditChildMenu,
    handleChildMenuCreation,
    handleChildMenuObjectChange,
    handleDeleteChildMenu,
    handleEditChildMenu,
  };
};
