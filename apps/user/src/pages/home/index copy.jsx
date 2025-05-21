// index.jsx
import { Button, Card, Col, Row, Space, Typography, Tree } from 'antd';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { ViewInstanceTable } from './components/table';
import { useMenuTreeQuery } from './hooks/use-user-tree';
import { useDataView } from './hooks/use-data-view';
import { useFormInstance } from './hooks/use-form-instance';
import { CreateFormInstanceModal } from './modals/create-form-instance';

/**
 * 首页 of user
 * @date 2025-04-28
 */

export const HomePage = () => {
  // handle tree date fetching!
  const { treeSelectData } = useMenuTreeQuery();

  // handle tree node select and data view/form schema fetching!
  const {
    dataview,
    rows,
    schema,
    pagination,
    loading,
    filters,
    addFilter,
    removeFilter,
    sorter,
    treeNodeSelectHandler,
    refreshTable,
  } = useDataView();

  // handle create form instance!
  const {
    isModalOpen,
    isEditOpen,
    formInstance,
    handleOk,
    handleCancel,
    openModal,
    openEditModal,
    closeEditModal,
    handleEditOk,
  } = useFormInstance(refreshTable);

  // 处理表格变化（分页、排序、筛选）
  const handleTableChange = (tablePagination, _, tableSorter) => {
    // 只处理分页和排序，过滤通过专用方法处理
    refreshTable(
      dataview.id,
      tablePagination.current,
      tablePagination.pageSize,
      filters, // 使用当前filters
      tableSorter
    );
  };

  return (
    <div className="home-page-user">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Card
            title={
              <Space>
                <MenuOutlined />
                <Typography.Text strong>用户菜单</Typography.Text>
              </Space>
            }
          >
            <Tree
              blockNode
              selectable
              treeData={treeSelectData}
              expandAction="click"
              onSelect={treeNodeSelectHandler}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={16} xl={18}>
          <Card
            title={dataview?.note}
            extra={
              <Space>
                <Button
                  disabled={!dataview}
                  type="primary"
                  icon={<PlusOutlined className="inline" />}
                  onClick={openModal}
                >
                  新增
                </Button>
              </Space>
            }
          >
            <ViewInstanceTable
              columns={dataview?.columnConfig?.columns || dataview?.columns}
              rows={rows}
              pagination={pagination}
              loading={loading}
              onChange={handleTableChange}
              openDataviewEditModal={row => openEditModal(row)}
              openDataviewDeleteModal={row => console.log('to delete', row)}
              sorter={sorter} // 传递排序状态
              addFilter={addFilter} // 添加过滤条件
              removeFilter={removeFilter} // 删除过滤条件
              dataview={dataview}
              filters={filters}
            />
          </Card>
        </Col>
      </Row>
      {/* create form instance modal */}
      <CreateFormInstanceModal
        action="Create"
        visible={isModalOpen}
        dataview={dataview}
        schema={schema}
        onOk={handleOk}
        onCancel={handleCancel}
      />
      {/* edit form instance modal */}
      <CreateFormInstanceModal
        action="Edit"
        visible={isEditOpen}
        dataview={dataview}
        schema={schema}
        formInstance={formInstance}
        onOk={handleEditOk}
        onCancel={closeEditModal}
      />
    </div>
  );
};
