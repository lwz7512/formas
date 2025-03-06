import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { App, Button, Divider, Layout, Tabs, theme, Tree } from 'antd';

import { useDataSource } from '@/hooks/use-datasource';
import { useBizTreeQuery } from '@/hooks/api-biztree';
import { useTreeNodeStore } from '@/hooks/use-shared-treenode';

import { ROOT_BIZ_TREE_ID, ROOT_BIZ_TREE_NAME } from '@/config';
import { FORM_DEFINE_PATH } from '@/constants';

import { DSTable } from './table';
import { AddNewDSModal } from './modals';

const { Content, Sider } = Layout;

/**
 * Form meta-data definition page
 * @returns
 */
export const DataSourcePage = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { loadTreeBy, treeSelectData } = useBizTreeQuery();
  const { onTreeNodeSelect } = useTreeNodeStore();
  const ds = useDataSource();

  const items = [
    {
      key: 'form',
      label: 'Form Define',
      children: 'loading content...',
    },
    {
      key: 'view',
      label: 'View Define',
      children: 'Content of Tab Pane 2',
    },
    {
      key: 'datasource',
      label: 'Datasouce Define',
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
            <Button className="mb-4" type="primary" onClick={ds.openNewDSModal}>
              Create New Data Source
            </Button>
          </Divider>

          {/* TODO: Data Source Table */}
          <DSTable list={ds.dsItems} />
        </Content>
      ),
    },
  ];

  // TODO: navigate to other page module ...
  const onChange = key => {
    console.log(`## switched to ${key} tab!`);
    if (key == 'form') {
      navigate(FORM_DEFINE_PATH);
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
        defaultActiveKey="datasource"
        items={items}
        onChange={onChange}
      />
      {/* == modals == */}
      <AddNewDSModal
        datasource={ds.datasource}
        isNewDSOpen={ds.isNewDSOpen}
        onDSFieldChange={ds.onDSFieldChange}
        handleDSCreation={ds.handleDSCreation}
        handleDSModalClose={ds.closeNewDSModal}
      />
    </Layout>
  );
};
