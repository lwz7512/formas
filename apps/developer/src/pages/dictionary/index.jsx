import { App, Button, Card, Input, Space } from 'antd';
import { BookOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

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
  const [searchCategory, setSearchCategory] = useState(''); // 新增搜索状态

  // 字典列表功能 Hook - 添加搜索参数
  const { data, pagination, loading, handlePageChange, fetchList, setSearch } =
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
      fetchList({ category: searchCategory }); // 创建后保持当前搜索条件
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
      fetchList({ category: searchCategory }); // 修改后保持当前搜索条件
      notification.success({ message: '修改字典项成功' });
    },
  });

  // 字典项操作功能 Hook
  const { handleDelete } = useDictionaryActions(() =>
    fetchList({ category: searchCategory })
  );

  // 新增搜索处理函数
  const handleSearch = () => {
    // 直接调用setSearch，它会处理状态更新和查询
    setSearch('category', searchCategory);
  };

  // 清空搜索
  const handleClearSearch = () => {
    setSearchCategory('');
    setSearch('category', '');
  };

  return (
    <Card
      title={
        <Space>
          <BookOutlined />
          数据字典
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreateModal}
          >
            新增字典项
          </Button>
        </Space>
      }
      extra={
        <Space>
          <Input
            placeholder="请输入分类"
            value={searchCategory}
            onChange={e => setSearchCategory(e.target.value)}
            onPressEnter={handleSearch} // 支持回车搜索
            allowClear
            onClear={handleClearSearch}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            查询
          </Button>
        </Space>
      }
      bordered={true}
    >
      <DictionaryTable
        data={data}
        loading={loading}
        onEdit={openModifyModal}
        onDelete={handleDelete}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onPageChange={(page, pageSize) =>
          handlePageChange(page, pageSize, { category: searchCategory })
        }
      />

      {/* 模态框保持不变 */}
      <CreateDictionaryModal
        visible={isCreateModalOpen}
        initialValues={{
          category: '',
          label: '',
          value: '',
          sequence: 0,
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
