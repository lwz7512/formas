import { App, Button, Card, Space } from 'antd';
import { BookOutlined, PlusOutlined } from '@ant-design/icons';

import { useDictionaryList } from './hooks/use-dictionary-list';
import { useCreateDictionary } from './hooks/use-create-dictionary';
import { useModifyDictionary } from './hooks/use-modify-dictionary';
import { useDictionaryActions } from './hooks/use-dictionary-actions';

import { CreateDictionaryModal } from './models/create-dictionary';
import { ModifyDictionaryModal } from './models/modify-dictionary';
import { DictionaryTable } from './dictionary-table';

/**
 * 数据字典管理页面
 */
export const DictionaryPage = () => {
  const { notification } = App.useApp();

  // 字典列表功能 Hook
  const { data, pagination, loading, handlePageChange, fetchList } =
    useDictionaryList();

  // 创建字典项功能 Hook
  const {
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    handleCreateDictionary,
    isCreating,
  } = useCreateDictionary({
    onSuccess: () => {
      fetchList();
      notification.success({ message: '创建字典项成功' });
    },
  });

  // 修改字典项功能 Hook
  const {
    isModifyModalOpen,
    currentDictionary,
    openModifyModal,
    closeModifyModal,
    handleUpdateDictionary,
    isUpdating,
  } = useModifyDictionary({
    onSuccess: () => {
      fetchList();
      notification.success({ message: '修改字典项成功' });
    },
  });

  // 字典项操作功能 Hook
  const { handleDelete } = useDictionaryActions(fetchList);

  return (
    <Card
      title={
        <Space>
          <BookOutlined />
          数据字典管理
        </Space>
      }
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openCreateModal}
        >
          新增字典项
        </Button>
      }
      bordered={false}
    >
      <DictionaryTable
        data={data}
        loading={loading}
        onEdit={openModifyModal}
        onDelete={handleDelete}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total
        }}
        onPageChange={handlePageChange}
      />

      <CreateDictionaryModal
        visible={isCreateModalOpen}
        initialValues={{
          category: '',
          label: '',
          value: '',
          sequence: 0
        }}
        onCancel={closeCreateModal}
        onSubmit={handleCreateDictionary}
        loading={isCreating}
      />

      <ModifyDictionaryModal
        visible={isModifyModalOpen}
        dictionaryItem={currentDictionary || {}}
        onSubmit={handleUpdateDictionary}
        onClose={closeModifyModal}
        loading={isUpdating}
      />
    </Card>
  );
};