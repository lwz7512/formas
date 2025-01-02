import { Button, Typography } from 'antd';

export const dataSource = [
  {
    key: '12345',
    title: 'Form ABC',
    moduleId: '12345',
    sequence: 1,
    note: '10 Downing Street',
  },
  {
    key: '23456',
    title: 'Form DEF',
    moduleId: '23456',
    sequence: 2,
    note: '10 Downing Street',
  },
  {
    key: '34567',
    title: 'Form GHJ',
    moduleId: '34567',
    sequence: 3,
    note: '10 Downing Street',
  },
];

export const columns = [
  {
    title: 'Form Name',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Module ID',
    dataIndex: 'moduleId',
    key: 'moduleId',
  },
  {
    title: 'Seqence',
    dataIndex: 'sequence',
    key: 'sequence',
  },
  {
    title: 'Note',
    dataIndex: 'note',
    key: 'title',
  },
  {
    title: 'Operation',
    dataIndex: 'actions',
    width: '25%',
    render: (_, record) => {
      return (
        <span data-key={record.key}>
          <Button
            size="small"
            color="primary"
            variant="dashed"
            className="mr-2"
            onClick={() => console.log(`open edit panel`)}
          >
            Edit Form
          </Button>
          <Button
            size="small"
            color="primary"
            variant="dashed"
            className="mr-2"
            onClick={() => console.log(`design edit panel`)}
          >
            Design Schema
          </Button>
          <Button
            size="small"
            color="danger"
            variant="dashed"
            onClick={() => console.log(`design edit panel`)}
          >
            Delete
          </Button>
        </span>
      );
    },
  },
];
