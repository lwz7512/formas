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
import { DATA_VIEW_PATH } from '@/constants';

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
 *
 * @date 2024/12/31
 * @returns
 */
export const FormDefinePage = () => {
  const navigate = useNavigate();

  const { message, notification } = App.useApp();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { loadTreeBy, treeSelectData } = useBizTreeQuery();

  /**
   * shared tree node store exposed for other page
   */
  const { expandedKeys, newChildNode, onTreeNodeSelect } =
    useTreeNodeStore(treeSelectData);

  /**
   * form page handlers, load all the forms by default
   */
  const { forms, isNewFormOpen, ...handlers } = useFormPage(
    message,
    newChildNode.pid
  );

  const { columns, form } = useEditableColumns(
    newChildNode.pid,
    handlers.refreshForms,
    notification
  );

  const treeNodeSelectHandler = (selectedKeys, info) => {
    const [pid] = selectedKeys;
    onTreeNodeSelect(selectedKeys, info);
    handlers.refreshForms(pid);
  };

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
              disabled={!newChildNode.pid}
              onClick={handlers.openNewFormModal}
            >
              Create New Form
            </Button>
          </Divider>

          {/* Form list */}
          {/* All forms are loaded by default, */}
          {/* list of forms are loaded by tree nodeId */}
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
      key: 'dataview',
      label: 'View Defined',
      children: 'loading content...',
    },
  ];

  // TODO: navigate to other page module ...
  const onChange = key => {
    // console.log(`## switched to ${key} tab!`);
    if (key == 'dataview') {
      navigate(DATA_VIEW_PATH);
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
        {/*
         * lazy init tree component until treeSelectData is loaded,
         * to allow the root node can be expanded as expected!
         * @date 2025/03/23
         */}
        {treeSelectData.length > 0 && (
          <Tree
            showLine={{
              showLeafIcon: true,
            }}
            autoExpandParent={true}
            defaultExpandParent={true}
            defaultExpandedKeys={expandedKeys}
            defaultSelectedKeys={expandedKeys.slice(-1)}
            showIcon={false}
            treeData={treeSelectData}
            onSelect={treeNodeSelectHandler}
          />
        )}
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
