import { useState } from 'react';
import { updateDataSource } from '../../../api/data-source';

export const useModifyDataSource = ({ onSuccess }) => {
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [currentDataSource, setCurrentDataSource] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // 打开修改模态框并设置当前数据源
  const openModifyModal = dataSource => {
    setCurrentDataSource(dataSource);
    setIsModifyModalOpen(true);
  };

  // 关闭修改模态框
  const closeModifyModal = () => {
    setIsModifyModalOpen(false);
    setCurrentDataSource(null); // 清空当前数据源
  };

  // 提交修改
  const handleUpdateDataSource = async values => {
    setIsUpdating(true);
    try {
      await updateDataSource({
        ...values,
        id: currentDataSource.id, // 确保携带原始ID
      });
      onSuccess?.(); // 成功回调
      closeModifyModal(); // 关闭模态框
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isModifyModalOpen,
    currentDataSource,
    openModifyModal,
    closeModifyModal,
    handleUpdateDataSource,
    isUpdating,
  };
};
