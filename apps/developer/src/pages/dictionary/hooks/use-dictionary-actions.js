import { App } from 'antd';
import { deleteDictionaryItem } from '@/api/dictionary';

export const useDictionaryActions = fetchList => {
  const { notification } = App.useApp();

  const handleDelete = async id => {
    await deleteDictionaryItem(id);
    notification.success({ message: '删除字典数据成功' });
    fetchList(); // 刷新列表
  };

  return { handleDelete };
};
