import { Button, Divider, Layout } from 'antd';

import { DSTable } from './table';

const { Content } = Layout;

export const createTabItems = ds => {
  return [
    {
      key: 'form',
      label: 'Form Define',
      children: 'loading content...',
    },
    {
      key: 'view',
      label: 'View Define',
      children: 'loading content...',
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
          <DSTable list={ds.dsItems} ds={ds} />
        </Content>
      ),
    },
  ];
};
