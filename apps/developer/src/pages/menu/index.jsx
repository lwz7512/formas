import { Flex, Typography, Tree } from 'antd';

import { MenuTreeNodeTitle } from './components/tree-node';

import { AddChildMenuModal } from './modals/create-child-menu';
import { EditChildMenuModal } from './modals/update-child-menu';
import { useUserMenu } from './hooks/use-user-menu';

/**
 * Menu Manage Page
 * @date 2025/04/08
 * @returns
 */
export const MenuManagePage = () => {
  const {
    isChildMenuModalOpen,
    isEditChildMenuModalOpen,
    childMenuObject,
    treeSelectData,
    showChildMenuModal,
    showEditChildMenu,
    closeChildMenuModal,
    handleChildMenuCreation,
    handleChildMenuObjectChange,
    handleEditChildMenu,
    handleDeleteChildMenu,
  } = useUserMenu();

  return (
    <>
      <Flex
        className="w-100"
        vertical
        gap="middle"
        style={{ minHeight: '100vh' }}
      >
        <Typography.Title className="m-0 text-center">
          User Menu Tree Management
        </Typography.Title>
        {/* left-main-nodes definition | right-sub-nodes definition */}
        <Flex
          className="left_part min-h-96 w-1/3 border border-red-500"
          vertical
        >
          <Tree
            blockNode
            selectable
            treeData={treeSelectData}
            titleRender={nodeData => {
              return (
                <MenuTreeNodeTitle
                  nodeData={nodeData}
                  onAddChild={showChildMenuModal}
                  onEditNode={showEditChildMenu}
                  onDeleteNode={handleDeleteChildMenu}
                />
              );
            }}
          />
        </Flex>
      </Flex>
      {/* ==== add new menu modal ==== */}
      <AddChildMenuModal
        childMenuObject={childMenuObject}
        isChildMenuOpen={isChildMenuModalOpen}
        handleChildMenuCreation={handleChildMenuCreation}
        handleChildModalClose={closeChildMenuModal}
        handleMenuObjectChange={handleChildMenuObjectChange}
      />
      {/* ==== edit child menu modal ==== */}
      <EditChildMenuModal
        childMenuObject={childMenuObject}
        isChildMenuOpen={isEditChildMenuModalOpen}
        handleChildMenuUpdate={handleEditChildMenu}
        handleChildModalClose={closeChildMenuModal}
        handleMenuObjectChange={handleChildMenuObjectChange}
      />
    </>
  );
};
