// 主页面
import { App, Button, Card, Space } from 'antd';
import { DatabaseOutlined, PlusOutlined } from '@ant-design/icons';

import { useDataSourceList } from './hooks/use-data-source-list';
import { useCreateDataSource } from './hooks/use-create-data-source';
import { useModifyDataSource } from './hooks/use-modify-data-source';
import { useDataSourceActions } from './hooks/use-data-source-actions';

import { CreateDataSourceModal } from './models/create-data-source';
import { ModifyDataSourceModal } from './models/modify-data-source';
import { DataSourceTable } from './data-source-table';

/**
 * Data Source Management Page
 * @returns
 */
export const DataSourcePage = () => {
  const { notification } = App.useApp();

  // 数据源列表功能 Hook
  const { data, pagination, loading, handlePageChange, fetchList } =
    useDataSourceList();

  // 创建数据源功能 Hook
  const {
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    handleCreateDataSource,
    isCreating,
  } = useCreateDataSource({
    onSuccess: () => {
      fetchList(); // 刷新列表
      notification.success({ message: '创建数据源成功' });
    },
  });

  // 修改数据源功能 Hook
  const {
    isModifyModalOpen,
    currentDataSource,
    openModifyModal,
    closeModifyModal,
    handleUpdateDataSource,
    isUpdating,
  } = useModifyDataSource({
    onSuccess: () => {
      fetchList();
      notification.success({ message: '修改数据源成功' });
    },
  });

  // 数据源其他操作功能 Hook
  const { handleDelete, handleTest } = useDataSourceActions(fetchList);

  return (
    <Card
      title={
        <Space>
          <DatabaseOutlined />
          数据源
        </Space>
      }
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={e => {
            openCreateModal();
          }}
        >
          创建
        </Button>
      }
    >
      <DataSourceTable
        data={data}
        loading={loading}
        onEdit={openModifyModal}
        onDelete={handleDelete}
        onTest={handleTest}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total
        }}
        onPageChange={handlePageChange}
      />

      <CreateDataSourceModal
        visible={isCreateModalOpen}
        initialValues={{
          title: '',
          driver: '',
          isDefault: 0,
          host: '',
          port: '',
          database: '',
          instance: '',
          user: '',
          password: '',
        }}
        onCancel={() => closeCreateModal()}
        onSubmit={handleCreateDataSource}
        loading={isCreating}
      />

      <ModifyDataSourceModal
        visible={isModifyModalOpen}
        datasource={currentDataSource || {}} // 使用修改Hook中的当前数据源
        onFieldChange={(field, value) => {
          // 如果需要本地状态管理可以在这里处理
        }}
        onSubmit={handleUpdateDataSource}
        onClose={closeModifyModal}
        loading={isUpdating}
      />
    </Card>
  );
};
