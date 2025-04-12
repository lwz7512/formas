import { message } from 'antd';
import {
  deleteDataSource,
  testDataSourceConnection,
} from '../../../api/data-source';

export const useDataSourceActions = fetchList => {
  const handleDelete = async id => {
    try {
      await deleteDataSource(id);
      message.success('删除成功');
      fetchList(); // 刷新列表
    } catch (error) {
      message.error('删除失败: ' + error.message);
    }
  };

  const handleTest = async id => {
    try {
      const result = await testDataSourceConnection(id);
      message.success('连接测试成功');
    } catch (error) {
      message.error('连接失败: ' + error.message);
    }
  };

  return { handleDelete, handleTest };
};
