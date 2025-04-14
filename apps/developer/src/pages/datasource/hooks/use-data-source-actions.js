import { App } from 'antd';
import {
  deleteDataSource,
  testDataSourceConnection,
} from '../../../api/data-source';

export const useDataSourceActions = fetchList => {
  const { notification } = App.useApp();

  const handleDelete = async id => {
    await deleteDataSource(id);
    notification.success({ message: '删除数据源成功' });
    fetchList(); // 刷新列表
  };

  const handleTest = async id => {
    const result = await testDataSourceConnection(id);
    notification.success({ message: '测试数据源连接成功' });
  };

  return { handleDelete, handleTest };
};
