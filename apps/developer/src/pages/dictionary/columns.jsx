import { Space, Button } from 'antd';

export const dataSource = [
  {
    key: '1',
    category: 'People',
    label: 'Mike',
    value: '110',
    sequence: 1,
  },
  {
    key: '2',
    category: 'People',
    label: 'Tony',
    value: '120',
    sequence: 2,
  },
  {
    key: '3',
    category: 'People',
    label: 'John',
    value: '130',
    sequence: 3,
  },
];

export const columns = [
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Label',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: 'Sequence',
    dataIndex: 'sequence',
    key: 'sequence',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <Space size="middle">
        <Button color="primary" variant="outlined">
          Update
        </Button>
        <Button color="danger" variant="outlined">
          Delete
        </Button>
      </Space>
    ),
  },
];
