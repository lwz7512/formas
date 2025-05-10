import { useState } from 'react';

import { Button, Card, Col, Row, Space, Typography, Tree } from 'antd';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';

import { ViewInstanceTable } from './components/table';

import { useMenuTreeQuery } from './hooks/use-user-tree';
import { useDataView } from './hooks/use-data-view';
import { useFormInstance } from './hooks/use-form-instance';

import { CreateFormInstanceModal } from './modals/create-form-instance';

/**
 * 首页 of user
 * @date 2025-04-28
 */

export const HomePage = () => {
  const { treeSelectData } = useMenuTreeQuery();
  const { dataview, treeNodeSelectHandler } = useDataView();
  const { isModalOpen, handleOk, handleCancel, openModal } = useFormInstance();

  return (
    <div className="home-page-user">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Card
            title={
              <Space align="center" className="flex gap-12">
                <MenuOutlined />
                <Typography.Text strong>用户菜单</Typography.Text>
              </Space>
            }
          >
            <Tree
              blockNode
              selectable
              treeData={treeSelectData}
              expandAction="click"
              onSelect={treeNodeSelectHandler}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={16}>
          <div className="flex justify-end">
            {dataview && (
              <Button type="primary" onClick={openModal}>
                <PlusOutlined />
                新增 form instance
              </Button>
            )}
          </div>
          <ViewInstanceTable columns={dataview?.columns} />
        </Col>
      </Row>
      <CreateFormInstanceModal
        visible={isModalOpen}
        dataview={dataview}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
};
