import { App, Layout, theme, Divider, Button } from 'antd';

import { useDataSource } from '@/hooks/use-datasource';

import { AddNewDSModal, ModifyDSModal } from './modals';
import { DSTable } from './table';

/**
 * Form meta-data definition page
 * @returns
 */
export const DataSourcePage = () => {
  const { message } = App.useApp();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const ds = useDataSource();

  return (
    <Layout
      style={{
        height: 'calc(100vh - 250px)',
        padding: '24px 0',
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
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
      <DSTable list={ds.dsItems} ds={ds} />
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
