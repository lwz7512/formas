import { App, Layout, theme, Divider, Button } from 'antd';

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
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
      notification.success({ message: '数据源创建成功' });
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
      notification.success({ message: '数据源修改成功' });
    },
  });

  // 数据源其他操作功能 Hook
  const { handleDelete, handleTest } = useDataSourceActions(fetchList);

  return (
    <Layout
      style={{
        minHeight: 'calc(100vh - 250px)',
        padding: '24px 0',
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Divider orientation="right" style={{ borderColor: '#7cb305' }}>
        <Button className="mb-4" type="primary" onClick={openCreateModal}>
          Create Data Source
        </Button>
      </Divider>

      <DataSourceTable
        data={data}
        loading={loading}
        onEdit={openModifyModal} // 关键点：将open方法传递给表格
        onDelete={handleDelete}
        onTest={handleTest}
        pagination={{
          ...pagination, // 确保展开所有分页属性
          showTotal: total => `共 ${total} 条`, // 显式显示总数
          onChange: handlePageChange,
          onShowSizeChange: handlePageChange,
        }}
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
    </Layout>
  );
};
