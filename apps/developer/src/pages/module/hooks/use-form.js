// hooks/use-form.js
import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { 
  fetchFormList, 
  createForm, 
  updateForm, 
  deleteForm,
  generateDataview 
} from '@/api/form';

export const useForm = (moduleId) => {
  const [loading, setLoading] = useState(false);
  const [forms, setForms] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchForms = async (id) => {
    setLoading(true);
    try {
      const response = await fetchFormList(id);
      setForms(response.datas || []);
    } catch (error) {
      notification.error({ message: '加载表单失败' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (values) => {
    try {
      setLoading(true);
      await createForm({ ...values, moduleId });
      await fetchForms(moduleId);
      notification.success({ message: '表单创建成功' });
      return true;
    } catch (error) {
      notification.error({ message: '创建表单失败' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (key, values) => {
    try {
      setLoading(true);
      await updateForm(key, values);
      await fetchForms(moduleId);
      notification.success({ message: '表单更新成功' });
      return true;
    } catch (error) {
      notification.error({ message: '更新表单失败' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (key) => {
    try {
      setLoading(true);
      await deleteForm(key);
      await fetchForms(moduleId);
      notification.success({ message: '表单删除成功' });
      return true;
    } catch (error) {
      notification.error({ message: '删除表单失败' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateView = async (formId) => {
    try {
      setLoading(true);
      await generateDataview(formId);
      notification.success({ message: '数据视图生成成功' });
      return true;
    } catch (error) {
      notification.error({ message: '生成视图失败' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (moduleId) {
      fetchForms(moduleId);
    }
  }, [moduleId]);

  return {
    forms,
    loading,
    editingKey,
    isModalOpen,
    setEditingKey,
    setIsModalOpen,
    fetchForms,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleGenerateView,
  };
};
