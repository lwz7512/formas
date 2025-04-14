import { useState } from 'react';
import { updateDictionaryItem } from '@/api/dictionary';

export const useModifyDictionary = ({ onSuccess }) => {
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [currentDictionary, setCurrentDictionary] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // 打开修改模态框并设置当前字典数据
  const openModifyModal = item => {
    setCurrentDictionary(item);
    setIsModifyModalOpen(true);
  };

  // 关闭修改模态框
  const closeModifyModal = () => {
    setIsModifyModalOpen(false);
    setCurrentDictionary(null); // 清空当前数据源
  };

  // 提交修改
  const handleUpdateDictionary = async values => {
    setIsUpdating(true);
    try {
      await updateDictionaryItem({
        ...values,
        id: currentDictionary.id, // 确保携带原始ID
      });
      onSuccess?.(); // 成功回调
      closeModifyModal(); // 关闭模态框
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isModifyModalOpen,
    currentDictionary,
    openModifyModal,
    closeModifyModal,
    handleUpdateDictionary,
    isUpdating,
  };
};
