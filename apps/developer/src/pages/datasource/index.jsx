import { Flex, Typography, Divider, Button } from 'antd';

import { DSTable } from './table';
import { AddNewDSModal } from './modals';
import { useDataSource } from '@/hooks/use-datasource';

export const DataSourcePage = () => {
  const ds = useDataSource();

  return (
    <>
      <Flex vertical gap="middle" style={{ minHeight: '100vh' }}>
        {/* Title */}
        <Typography.Title className="m-0 text-center">
          DataSource Config
        </Typography.Title>
        {/* == Add New Data Source == */}
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
      </Flex>
      {/* == modals == */}
      <AddNewDSModal
        datasource={ds.datasource}
        isNewDSOpen={ds.isNewDSOpen}
        onDSFieldChange={ds.onDSFieldChange}
        handleDSCreation={ds.handleDSCreation}
        handleDSModalClose={ds.closeNewDSModal}
      />
    </>
  );
};
