import { Space } from 'antd';
import { ProfileOutlined, TableOutlined } from '@ant-design/icons';

/**
 *
 * @returns
 */
export const FormTabLabel = () => {
  return (
    <Space>
      <ProfileOutlined />
      表单
    </Space>
  );
};

export const ViewTabLabel = () => {
  return (
    <Space>
      <TableOutlined />
      视图
    </Space>
  );
};

export const PresentationTabLabel = () => {
  return (
    <Space>
      <ProfileOutlined />
      展示
    </Space>
  );
};
