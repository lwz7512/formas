// components/child-node-tree.jsx
import { Button, Empty, Popconfirm, Tree, theme } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

export const ChildNodeTree = ({
  currentRoot,
  onAddChild,
  onEditNode,
  onDeleteNode,
  onNodeSelect,
  treeData = [],
  loading = false,
}) => {
  const { token } = theme.useToken();

  const renderTreeNodeTitle = (nodeData) => {
    return (
      <div className="flex items-center justify-between w-full group">
        <span className="truncate flex-1">{nodeData.title}</span>
        <div className="tree-node-actions opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            type="text"
            size="small"
            icon={<PlusOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onAddChild?.(nodeData);
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onEditNode?.(nodeData);
            }}
          />
          <Popconfirm
            title={`确认删除【${nodeData.title}】节点？`}
            description="删除后无法恢复，请谨慎操作"
            onConfirm={() => onDeleteNode?.(nodeData)}
            okText="确认删除"
            cancelText="取消"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              danger
              onClick={(e) => e.stopPropagation()}
            />
          </Popconfirm>
        </div>
      </div>
    );
  };

  const treeStyle = useMemo(
    () => ({
      background: token.colorBgContainer,
      borderRadius: token.borderRadius,
      padding: '8px 0',
    }),
    [token]
  );

  if (!currentRoot) {
    return (
      <div className="flex items-center justify-center h-full">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="请先选择左侧的根节点"
          imageStyle={{ height: 60 }}
        />
      </div>
    );
  }

  return (
    <Tree
      className="biz-tree"
      style={treeStyle}
      blockNode
      showLine={{
        showLeafIcon: false,
        color: token.colorBorderSecondary,
      }}
      onSelect={(_, { node }) => onNodeSelect?.(node)}
      treeData={treeData}
      titleRender={renderTreeNodeTitle}
      selectedKeys={[currentRoot?.selectedChildId]}
      expandAction="click"
      rootStyle={{
        padding: '4px 0',
      }}
    />
  );
};
