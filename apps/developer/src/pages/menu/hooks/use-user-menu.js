import { useState, useEffect } from 'react';

import { createMenu, fetchMenuList } from '@/api/api-menu';

import { ROOT_MENU_PID } from '@/config';

import { useMenuTreeQuery } from './use-user-tree';

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
  // current root menu object, also act as the parent menu object!
  const [rootMenuObject, setRootMenuObject] = useState(initialRootMenuObject);

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

  const showRootMenuModal = () => {
    setIsRootMenuModalOpen(true);
  };

  const closeRootMenuModal = () => {
    setIsRootMenuModalOpen(false);
  };

  const showChildMenuModal = () => {
    setIsChildMenuModalOpen(true);
  };

  const closeChildMenuModal = () => {
    setIsChildMenuModalOpen(false);
  };

  const rootMenuItemClickHandler = async item => {
    // save root menu object
    setRootMenuObject(item);
    // load sub-menu tree
    console.log(`>>> load menu tree by item:`, item);
    // ! to be fixed after the backend is updated...
    await loadTreeBy(item.id, item.title);
    // TODO: show child menu tree on right side
  };

  const onRootMenuOperationClick = (event, rootId) => {
    // save `parent id` as drop-down menu item selected
    setChildMenuObject({ ...childMenuObject, pid: rootId });

    if (event.key == 'add_menu_node') {
      showChildMenuModal();
      console.log(`>>> showChildMenuModal`);
    }
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

  const handleChildMenuObjectChange = (key, value) => {
    setChildMenuObject({ ...childMenuObject, [key]: value });
  };

  const handleChildMenuCreation = async () => {
    setIsChildMenuModalOpen(false);
    // console.log(`>>> to create child menu:`, childMenuObject);
    await createMenu(childMenuObject);
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
    rootMenuObject,
    isRootMenuModalOpen,
    isChildMenuModalOpen,
    childMenuObject,
    treeSelectData,
    closeChildMenuModal,
    onRootMenuOperationClick,
    rootMenuItemClickHandler,
    showRootMenuModal,
    closeRootMenuModal,
    handleRootMenuCreation,
    handleMenuObjectChange,
    showChildMenuModal,
    handleChildMenuCreation,
    handleChildMenuObjectChange,
  };
};
