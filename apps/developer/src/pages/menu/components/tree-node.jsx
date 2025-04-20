// components/child-node-tree.jsx
import { Button, Popconfirm } from 'antd';
import {
  PlusOutlined, // 加号图标
  EditOutlined, // 编辑图标
  DeleteOutlined, // 删除图标
  // DeploymentUnitOutlined, // 部署单元图标
} from '@ant-design/icons';

export const MenuTreeNodeTitle = ({
  nodeData,
  onAddChild,
  onEditNode,
  onDeleteNode,
}) => {
  return (
    <div className="flex items-center justify-between w-full group">
      <span className="truncate flex-1">{nodeData.title}</span>
      <div className="tree-node-actions opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button
          type="text"
          size="small"
          icon={<PlusOutlined />}
          onClick={e => {
            e.stopPropagation();
            onAddChild?.(nodeData);
          }}
        />
        <Button
          type="text"
          size="small"
          icon={<EditOutlined />}
          onClick={e => {
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
            onClick={e => e.stopPropagation()}
          />
        </Popconfirm>
      </div>
    </div>
  );
};
