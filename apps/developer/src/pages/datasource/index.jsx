import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { App, Layout, Tabs, theme, Tree } from 'antd';

import { ROOT_BIZ_TREE_ID, ROOT_BIZ_TREE_NAME } from '@/config';
import { FORM_DEFINE_PATH } from '@/constants';

import { useDataSource } from '@/hooks/use-datasource';
import { useBizTreeQuery } from '@/hooks/api-biztree';
import { useTreeNodeStore } from '@/hooks/use-shared-treenode';

import { AddNewDSModal, ModifyDSModal } from './modals';
import { createTabItems } from './tabItems';

const { Sider } = Layout;

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

  // TODO: navigate to other page module ...
  const onChange = key => {
    // console.log(`## switched to ${key} tab!`);
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
        items={createTabItems(ds)}
        onChange={onChange}
      />
      {/* == modals: == */}
      <AddNewDSModal
        datasource={ds.datasource}
        isNewDSOpen={ds.isNewDSOpen}
        onDSFieldChange={ds.onDSFieldChange}
        handleDSCreation={ds.handleDSCreation}
        handleDSModalClose={ds.closeNewDSModal}
      />
      {/* TODO: update datasource */}
      <ModifyDSModal
        datasource={ds.datasource}
        isModifyDSOpen={ds.isModifyDSOpen}
        onDSFieldChange={ds.onDSFieldChange}
        handleDSUpdate={ds.handleDSUpdate}
        handleDSModalClose={ds.closeModifyDSModal}
      />
      {/* TODO: delete datasource */}
    </Layout>
  );
};
