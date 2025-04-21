// index.jsx
import { useState } from 'react';
import { App, Button, Card, Col, Row, Space, Typography, Tree } from 'antd';
import { AppstoreOutlined, PlusOutlined } from '@ant-design/icons';
import { useModuleTree } from './hooks/use-module-tree';

import { CreateModuleModal } from './models/create-module';

export const ModuleDevelopmentConsole = () => {
  const { message } = App.useApp();
  const {
    treeData,
    loading,
    // selectedModule,
    // setSelectedModule,
    addModule
  } = useModuleTree();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const handleCreateModule = async (values) => {
    try {
      // 调用API创建模块
      console.log('创建模块:', values);
      // 成功后关闭对话框
      setIsModalVisible(false);
    } catch (error) {
      console.error('创建失败', error);
    }
  };

  const onSelectModule = (selectedKeys, { node }) => {
    setSelectedModule(node);
  };

  return (
    <div className="module-development-console">
      <Row gutter={[16, 16]}>
        {/* 左侧模块树区域 */}
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Card
            title={
              <Space align="center">
                <AppstoreOutlined />
                <Typography.Text strong>模块</Typography.Text>
              </Space>
            }
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
                loading={loading}
              >
                新增模块
              </Button>
            }
            loading={loading}
          >
            <Tree
              treeData={treeData}
              onSelect={onSelectModule}
              selectedKeys={selectedModule ? [selectedModule.key] : []}
              fieldNames={{ title: 'title', key: 'id' }}
            />
          </Card>
        </Col>

        {/* 右侧内容区域 */}
        <Col xs={24} sm={24} md={12} lg={16} xl={18}>
          <Card
            title={
              <Space align="center">
                <Typography.Text strong>子节点管理</Typography.Text>
                {selectedModule && (
                  <Typography.Text type="secondary">
                    (当前模块: {selectedModule.title})
                  </Typography.Text>
                )}
              </Space>
            }
          >
            {/* 这里放置子模块或表单等内容 */}
          </Card>
        </Col>
      </Row>

      <CreateModuleModal
        visible={isModalVisible}
        onOk={handleCreateModule}
        onClose={() => setIsModalVisible(false)}
        parentModule={selectedModule}
        loading={false}
      />
    </div>
  );
};