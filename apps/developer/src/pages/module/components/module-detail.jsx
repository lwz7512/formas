// components/module-detail.jsx
import { useState } from 'react';
import { Button, Empty, Tabs, Typography } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { useView } from '../hooks/use-dataview';
import { useForm } from '../hooks/use-form';
import { usePresentation } from '../hooks/use-presentation';
import { ViewTable } from './view-table';
import { FormTable } from './form-table';
import { FormCreateModel } from '../modals/form-create';
import { PresentationCreateModel } from '../modals/presentation-create';
import { FormTabLabel, ViewTabLabel, PresentationTabLabel } from './widget';
import { PresentationTable } from './presentation-table';

/**
 * Tabs content for:
 * | form_tab | view_tab | presentation_tab |
 */
export const ModuleDetailPanel = ({ selectedModule, toast }) => {
  const [activeTab, setActiveTab] = useState('forms');

  const switchTab = tab => setActiveTab(tab);

  // == view related logic ==
  const {
    views,
    loading: viewLoading,
    handleDelete: handleViewDelete,
    handleUpdate: handleViewUpdate,
    refreshViews,
  } = useView(selectedModule?.id, toast);

  // == form related logic ==
  const {
    forms,
    loading: formsLoading,
    isCreateFormOpen,
    openCreateForm,
    closeCreateForm,
    handleCreate,
    handleDelete,
    handleGenerateView,
    handleEdit,
  } = useForm(selectedModule?.id);

  // == presentation related logic ==
  const {
    presentations,
    loading: presentsLoading,
    isCreatePresentationOpen,
    openCreatePresentation,
    closeCreatePresentation,
    handleCreatePresentation,
    refreshPresentations,
  } = usePresentation(selectedModule?.id, toast, switchTab);

  if (!selectedModule) {
    return (
      <div className="module-detail-panel">
        <Typography.Title level={4} style={{ marginBottom: 16 }}>
          模块详情
        </Typography.Title>
        <Empty description="请从左侧选择模块" />
      </div>
    );
  }

  const tabBarExtraActions = () => {
    const actionsByTab = {
      forms: (
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreateForm}>
          新建表单
        </Button>
      ),
      views: (
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          danger
          onClick={refreshViews}
        >
          视图
        </Button>
      ),
      presentation: (
        <Button
          color="default"
          variant="solid"
          icon={<ReloadOutlined />}
          onClick={refreshPresentations}
        >
          展示
        </Button>
      ),
    };
    return actionsByTab[activeTab] || null;
  };

  return (
    <>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        tabBarExtraContent={tabBarExtraActions()}
        items={[
          {
            key: 'forms',
            label: <FormTabLabel />,
            // == form table & its modals ==
            children: (
              <FormTable
                forms={forms}
                loading={formsLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onGenerateView={handleGenerateView}
              />
            ),
          },
          {
            key: 'views',
            label: <ViewTabLabel />,
            // == view table & its modals ==
            children: (
              <ViewTable
                views={views}
                loading={viewLoading}
                moduleId={selectedModule?.id}
                handleUpdate={handleViewUpdate}
                handleDelete={handleViewDelete}
                openCreatePresentation={openCreatePresentation}
              />
            ),
          },
          {
            key: 'presentation',
            label: <PresentationTabLabel />,
            children: (
              <PresentationTable
                presents={presentations}
                loading={presentsLoading}
                moduleId={selectedModule?.id}
              />
            ),
          },
        ]}
      />

      {/* == create new `form` from module detail page == */}
      <FormCreateModel
        visible={isCreateFormOpen}
        onCancel={closeCreateForm}
        onSubmit={handleCreate}
        moduleId={selectedModule?.id}
      />
      {/* == create new `presentation` from data view table == */}
      <PresentationCreateModel
        visible={isCreatePresentationOpen}
        onCancel={closeCreatePresentation}
        onSubmit={handleCreatePresentation}
      />
    </>
  );
};
