// views.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { App, Layout, Tabs, theme, Tree } from 'antd';

import { ROOT_BIZ_TREE_ID, ROOT_BIZ_TREE_NAME } from '@/config';
import { FORM_DEFINE_PATH } from '@/constants';

import { useBizTreeQuery } from '@/hooks/api-biztree';
import { useTreeNodeStore } from '@/hooks/use-shared-treenode';

import { DVTable } from './table';

const { Content, Sider } = Layout;

/**
 * Data view page
 * @date 2025/03/23
 * @returns
 */
export const DataViewPage = () => {
  const navigate = useNavigate();

  const { notification } = App.useApp();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { loadTreeBy, treeSelectData } = useBizTreeQuery();
  /**
   * shared tree node store exposed for other page
   */
  const { expandedKeys, newChildNode, onTreeNodeSelect } =
    useTreeNodeStore(treeSelectData);

  const treeNodeSelectHandler = (selectedKeys, info) => {
    // const [pid] = selectedKeys;
    onTreeNodeSelect(selectedKeys, info);
  };

  // TODO: navigate to other page module ...
  const onChange = key => {
    // console.log(`## switched to ${key} tab!`);
    if (key == 'form') {
      navigate(FORM_DEFINE_PATH);
    }
  };

  const items = [
    {
      key: 'form',
      label: 'Form Define',
      children: 'loading content...',
    },
    {
      key: 'dataview',
      label: 'View Defined',
      children: (
        <Content
          className="form-define-tab"
          style={{ padding: '0 24px', minHeight: '70vh' }}
        >
          <DVTable
            moduleId={newChildNode.pid}
            notificationInstance={notification}
          />
        </Content>
      ),
    },
  ];

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
        defaultActiveKey="dataview"
        items={items}
        onChange={onChange}
      />
    </Layout>
  );
};
