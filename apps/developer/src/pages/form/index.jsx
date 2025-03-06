import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  App,
  Button,
  Divider,
  Form,
  Layout,
  Table,
  Tabs,
  theme,
  Tree,
} from 'antd';

import { EditableCell } from '@/components';
import { ROOT_BIZ_TREE_ID, ROOT_BIZ_TREE_NAME } from '@/config';
import { EXTERNAL_DATA_SOURCE_PATH } from '@/constants';

import { useBizTreeQuery } from '@/hooks/api-biztree';
import { useFormPage } from '@/hooks/use-form';
import { useTreeNodeStore } from '@/hooks/use-shared-treenode';

import { useEditableColumns } from './columns';
import { AddNewFormModal } from './modals';

// == shortcut of designer page! ==
export { FormSchemaDesigner } from './designer';

const { Content, Sider } = Layout;

/**
 * Form meta-data definition page
 * @returns
 */
export const FormDefinePage = () => {
  const navigate = useNavigate();

  const { message } = App.useApp();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { loadTreeBy, treeSelectData } = useBizTreeQuery();
  const { newChildNode, onTreeNodeSelect } = useTreeNodeStore();

  const { forms, isNewFormOpen, ...handlers } = useFormPage(message);

  const { columns, form } = useEditableColumns(handlers.refreshForms);

  const items = [
    {
      key: 'form',
      label: 'Form Define',
      children: (
        <Content
          className="form-define-tab"
          style={{ padding: '0 24px', minHeight: '70vh' }}
        >
          <Divider
            orientation="right"
            style={{
              borderColor: '#7cb305',
            }}
          >
            <Button
              className="mb-4"
              type="primary"
              onClick={handlers.openNewFormModal}
            >
              Create New Form
            </Button>
          </Divider>

          {/* Form list */}
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={forms}
              columns={columns}
              rowClassName="editable-row"
            />
          </Form>
        </Content>
      ),
    },
    {
      key: 'view',
      label: 'View Define',
      children: 'Content of Tab Pane 2',
    },
    {
      key: 'datasource',
      label: 'Datasouce Define',
      children: 'loading content...',
    },
  ];

  // TODO: navigate to other page module ...
  const onChange = key => {
    console.log(`## switched to ${key} tab!`);
    if (key == 'datasource') {
      navigate(EXTERNAL_DATA_SOURCE_PATH);
    }
  };

  useEffect(() => {
    loadTreeBy(ROOT_BIZ_TREE_ID, ROOT_BIZ_TREE_NAME);
  }, [loadTreeBy]);

  return (
    <Layout
      style={{
        padding: '24px 0',
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Sider
        style={{ background: colorBgContainer, borderRight: '1px solid #CCC' }}
        width={200}
      >
        {/* TODO: using biz-tree component... */}
        <Tree
          showLine={{
            showLeafIcon: true,
          }}
          showIcon={false}
          treeData={treeSelectData}
          onSelect={onTreeNodeSelect}
        />
      </Sider>
      {/* main content reside in tab */}
      <Tabs
        className="ml-4 w-full"
        defaultActiveKey="form"
        items={items}
        onChange={onChange}
      />
      {/* === New Form Modal === */}
      <AddNewFormModal
        isFormModalOpen={isNewFormOpen}
        selectedBizModel={newChildNode.pid}
        handleFormModalClose={handlers.closeFormModal}
        handleFormCreation={handlers.createNewForm}
      />
    </Layout>
  );
};
