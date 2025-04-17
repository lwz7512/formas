// index.jsx
import { useState } from 'react';
import { App, Button, Card, Col, Row, Space, Typography } from 'antd';
import { ClusterOutlined, PlusOutlined } from '@ant-design/icons';

import { useRootNodeList } from './hooks/use-root-node-list';
import { useCreateRootNode } from './hooks/use-create-root-node';
import { useEditRootNode } from './hooks/use-modify-root-node';
import { useRootNodeActions } from './hooks/use-root-node-actions';
import { useChildNodeList } from './hooks/use-child-node-list';
import { useCreateChildNode } from './hooks/use-create-child-node';
import { useChildNodeActions } from './hooks/use-child-node-actions';
import { useEditChildNode } from './hooks/use-edit-child-node';

import { RootNodeTable } from './components/root-node-table';
import { CreateRootNodeModal } from './models/create-root-node';
import { EditRootNodeModal } from './models/modify-root-node';
import { ChildNodeTree } from './components/child-node-tree';
import { CreateChildNodeModal } from './models/create-child-node';
import { EditChildNodeModal } from './models/edit-child-node';
import './BizTreeConfig.css';

export const BizTreeConfigPage = () => {
  const { message } = App.useApp();

  // 根节点列表数据
  const {
    data,
    pagination,
    loading,
    handleTableChange,
    refresh: refreshRootList,
  } = useRootNodeList();

  // 根节点创建
  const {
    isModalOpen: isRootModalOpen,
    showModal: showRootModal,
    closeModal: closeRootModal,
    handleSubmit: handleRootCreation,
    loading: isCreatingRoot,
  } = useCreateRootNode(refreshRootList, message);

  // 根节点修改
  const {
    isModalOpen: isEditModalOpen,
    showModal: showEditModal,
    closeModal: closeEditModal,
    handleSubmit: handleEditSubmit,
    loading: isEditingRoot,
  } = useEditRootNode(refreshRootList, message);

  // 根节点删除
  const { handleDelete } = useRootNodeActions(refreshRootList);

  // 当前选中节点
  const [currentNode, setCurrentNode] = useState(null);

  // 子节点hook
  const {
    treeData: childTreeData,
    loading: childLoading,
    refresh: refreshChildList,
  } = useChildNodeList(currentNode?.id, message);

  // 添加子节点hook
  const {
    isModalOpen: isChildModalOpen,
    showModal: showChildModal,
    closeModal: closeChildModal,
    handleSubmit: handleChildCreation,
    parentNode,
    loading: isCreatingChild,
  } = useCreateChildNode(refreshChildList, message);

  // 编辑子节点hook
  const {
    isModalOpen: isEditChildModalOpen,
    showModal: showEditChildModal,
    closeModal: closeEditChildModal,
    handleSubmit: handleEditChildSubmit,
    currentNode: editingChildNode,
    loading: isEditingChild,
  } = useEditChildNode(refreshChildList, message);

  // 删除子节点hook
  const { isDeleting: isDeletingChild, handleDelete: handleDeleteChild } =
    useChildNodeActions(refreshChildList, message);

  return (
    <div className="biz-tree-config-page">
      <Row gutter={[16, 16]}>
        {/* 左侧根节点区域 */}
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Card
            title={
              <Space align="center">
                <ClusterOutlined />
                <Typography.Text strong>业务树</Typography.Text>
              </Space>
            }
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showRootModal}
                loading={loading || isCreatingRoot}
              >
                新增根节点
              </Button>
            }
            className="root-node-card"
            loading={loading}
          >
            <RootNodeTable
              data={data}
              currentId={currentNode?.id}
              loading={loading}
              pagination={pagination}
              onRowClick={setCurrentNode}
              onMenuClick={(action, id, record) => {
                if (action === 'delete') {
                  handleDelete(id);
                } else if (action === 'edit') {
                  showEditModal(record);
                } else if (action === 'add') {
                  showChildModal(record);
                }
              }}
              onChange={handleTableChange}
              rowClassName={record =>
                record.id === currentNode?.id ? 'ant-table-row-selected' : ''
              }
            />
          </Card>
        </Col>

        {/* 右侧子树区域 */}
        <Col xs={24} sm={24} md={12} lg={16} xl={18}>
          <Card
            title={
              <Space align="center">
                <Typography.Text strong>子节点管理</Typography.Text>
                {currentNode?.title && (
                  <Typography.Text type="secondary">
                    (当前根节点: {currentNode.title})
                  </Typography.Text>
                )}
              </Space>
            }
            className="subtree-card"
          >
            <ChildNodeTree
              currentRoot={currentNode}
              treeData={childTreeData}
              loading={childLoading || isDeletingChild}
              onAddChild={showChildModal}
              onEditNode={showEditChildModal} // 传递编辑处理函数
              onDeleteNode={handleDeleteChild} // 传递删除处理函数
              onNodeSelect={node => {
                // 处理节点选择
                console.log('选中节点:', node);
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* 创建根节点模态框 */}
      <CreateRootNodeModal
        visible={isRootModalOpen}
        onOk={handleRootCreation} // 直接接收表单值
        onClose={closeRootModal}
        loading={isCreatingRoot}
      />

      {/* 修改根节点模态框 */}
      <EditRootNodeModal
        visible={isEditModalOpen}
        onOk={handleEditSubmit}
        onClose={closeEditModal}
        node={currentNode}
        loading={isEditingRoot}
      />

      {/* 创建子节点模态框 */}
      <CreateChildNodeModal
        visible={isChildModalOpen}
        onOk={handleChildCreation}
        onClose={closeChildModal}
        parentNode={parentNode}
        loading={isCreatingChild}
      />

      {/* 编辑子节点模态框 */}
      <EditChildNodeModal
        visible={isEditChildModalOpen}
        onOk={handleEditChildSubmit}
        onClose={closeEditChildModal}
        node={editingChildNode}
        loading={isEditingChild}
      />
    </div>
  );
};
