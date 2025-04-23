// components/child-node-tree.jsx
import { Button, Popconfirm } from 'antd';
import {
  PlusOutlined, // 加号图标
  EditOutlined, // 编辑图标
  DeleteOutlined, // 删除图标
  // DeploymentUnitOutlined, // 部署单元图标
} from '@ant-design/icons';

/**
 * 菜单树节点标题 component
 * @date 2025/04/20
 * @param {Object} nodeData 节点数据
 * @param {Function} onAddChild 添加子节点
 * @param {Function} onEditNode 编辑节点
 * @param {Function} onDeleteNode 删除节点
 */
export const MenuTreeNodeTitle = ({
  nodeData,
  onAddChild,
  onEditNode,
  onDeleteNode,
}) => {
  const { depth } = nodeData;

  return (
    <div className="flex items-center justify-between w-full group">
      <span className="truncate flex-1">{nodeData.title}</span>
      <div className="tree-node-actions opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button
          type="text"
          size="small"
          title="添加子节点"
          icon={<PlusOutlined />}
          onClick={e => {
            e.stopPropagation();
            onAddChild?.(nodeData);
          }}
        />
        {/* only show actions when depth is greater than 0, because root menu could not be deleted! */}
        {depth > 0 && (
          <Button
            type="text"
            size="small"
            title="编辑节点"
            icon={<EditOutlined />}
            onClick={e => {
              e.stopPropagation();
              onEditNode?.(nodeData);
            }}
          />
        )}
        {/* only show actions when depth is greater than 0, because root menu could not be deleted! */}
        {depth > 0 && (
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
              title="删除节点"
              icon={<DeleteOutlined />}
              danger
              onClick={e => e.stopPropagation()}
            />
          </Popconfirm>
        )}
      </div>
    </div>
  );
};
