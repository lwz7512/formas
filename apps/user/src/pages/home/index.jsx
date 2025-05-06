import { Button, Card, Col, Row, Space, Typography, Tree } from 'antd';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';

import { ViewInstanceTable } from './components/table';
import { useMenuTreeQuery } from './hooks/use-user-tree';
import { useDataView } from './hooks/use-data-view';
/**
 * 首页 of user
 * @date 2025-04-28
 */

export const HomePage = () => {
  const { treeSelectData } = useMenuTreeQuery();
  const { dataview, treeNodeSelectHandler } = useDataView();
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
          <ViewInstanceTable />
        </Col>
      </Row>
    </div>
  );
};
