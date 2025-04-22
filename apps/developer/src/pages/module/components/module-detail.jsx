// components/module-detail.jsx
import { useState, useEffect } from 'react';
import { Button, Empty, Space, Table, Tabs, Typography } from 'antd';
import { FormOutlined, PlusOutlined, TableOutlined } from '@ant-design/icons';
// import { useView } from './hooks/use-view';
import { ViewTable } from './view-table';

export const ModuleDetailPanel = ({ selectedModule }) => {
  const [activeTab, setActiveTab] = useState('forms');

  // 表单数据
  const formData = [
    {
      id: '1',
      name: '用户表单',
      code: 'user_form',
      description: '用户信息录入表单',
    },
    {
      id: '2',
      name: '订单表单',
      code: 'order_form',
      description: '订单信息表单',
    },
  ];

  // 表格列定义
  const formColumns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<FormOutlined />}>
            编辑
          </Button>
          <Button type="link" danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 处理新建操作
  const handleCreate = () => {
    console.log(`创建${activeTab === 'forms' ? '表单' : '视图'}`);
  };

  if (!selectedModule) {
    return (
      <div className="module-detail-panel">
        <Typography.Title level={4} style={{ marginBottom: 16 }}>
          模块详情
        </Typography.Title>
        <Empty description="请从左侧选择模块" />
      </div>
    );
  }

  return (
    <Tabs
      activeKey={activeTab}
      onChange={setActiveTab}
      tabBarExtraContent={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          {activeTab === 'forms' ? '新建表单' : '新建视图'}
        </Button>
      }
      items={[
        {
          key: 'forms',
          label: (
            <Space>
              <TableOutlined />
              表单
            </Space>
          ),
          children: (
            <Table
              columns={formColumns}
              dataSource={formData}
              rowKey="id"
              bordered
              size="middle"
            />
          ),
        },
        {
          key: 'views',
          label: (
            <Space>
              <TableOutlined />
              视图
            </Space>
          ),
          children: <ViewTable moduleId={selectedModule?.id} />,
        },
      ]}
    />
  );
};
