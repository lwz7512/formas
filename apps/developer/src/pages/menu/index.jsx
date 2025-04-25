import { Button, Card, Col, Row, Space, Typography, Tree } from 'antd';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';

import { MenuTreeNodeTitle } from './components/tree-node';
import { AddChildMenuModal } from './modals/create-child-menu';
import { EditChildMenuModal } from './modals/update-child-menu';

import { useUserMenu } from './hooks/use-user-menu';
import { useDataviewTree } from './hooks/use-dataview-tree';

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

  // 新增根菜单处理函数
  const handleAddRootMenu = () => {
    handleChildMenuObjectChange({ parentId: null }); // 设置parentId为null表示根菜单
    showChildMenuModal();
  };

  const { dataviewTree, dataviewTreeSelectData, loadDataviewTree } = useDataviewTree();

  // 如果需要转换格式，可以在组件内处理
  const formattedTreeData = dataviewTree.map(item => ({
    title: item.title,
    value: item.id,
    selected: item.selected,
    disabled: item.disabled,
    children: item.children?.map(child => ({
      title: child.title,
      value: child.id,
      selected: child.selected,
      disabled: child.disabled,
    })),
  }));

  return (
    <div className="biz-tree-config-page">
      <Row gutter={[16, 16]}>
        {/* 左侧菜单树区域 */}
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Card
            title={
              <Space align="center">
                <MenuOutlined />
                <Typography.Text strong>菜单</Typography.Text>
              </Space>
            }
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddRootMenu}
                loading={isChildMenuModalOpen}
              >
                新增菜单
              </Button>
            }
            bodyStyle={{
              padding: '20px 20px 20px 0',
              margin: 0,
            }}
          >
            <Tree
              blockNode
              selectable
              treeData={treeSelectData}
              expandAction="click"
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
          </Card>
        </Col>

        {/* 右侧内容区域 */}
        <Col xs={24} sm={24} md={12} lg={16} xl={18}>
          <Card>{/* 这里可以放置菜单详情或其他相关内容 */}</Card>
        </Col>
      </Row>

      {/* 新增菜单对话框 */}
      <AddChildMenuModal
        childMenuObject={childMenuObject}
        isChildMenuOpen={isChildMenuModalOpen}
        handleChildMenuCreation={handleChildMenuCreation}
        handleChildModalClose={closeChildMenuModal}
        handleMenuObjectChange={handleChildMenuObjectChange}
      />

      {/* 编辑菜单对话框 */}
      <EditChildMenuModal
        childMenuObject={childMenuObject}
        isChildMenuOpen={isEditChildMenuModalOpen}
        handleChildMenuUpdate={handleEditChildMenu}
        handleChildModalClose={closeChildMenuModal}
        handleMenuObjectChange={handleChildMenuObjectChange}
        dataviewOptions={formattedTreeData}
      />
    </div>
  );
};
