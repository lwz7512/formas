import { message } from 'antd';
import {
  deleteDictionaryItem,
} from '@/api/dictionary';

export const useDictionaryActions = fetchList => {
  const handleDelete = async id => {
    try {
      await deleteDictionaryItem(id);
      message.success('删除成功');
      fetchList(); // 刷新列表
    } catch (error) {
      message.error('删除失败: ' + error.message);
    }
  };

  return { handleDelete, handleTest };
};
