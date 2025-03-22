import { Button, Popconfirm, Typography } from 'antd';

export const RowDisplayActions = ({
  record,
  updateFormRowHandler,
  cancelChangeHandler,
}) => (
  <span data-key={record.key}>
    <Typography.Link
      onClick={() => updateFormRowHandler(record.key)}
      style={{
        marginInlineEnd: 8,
      }}
    >
      Save
    </Typography.Link>
    <Typography.Link
      onClick={cancelChangeHandler}
      style={{
        marginInlineEnd: 8,
      }}
    >
      Cancel
    </Typography.Link>
  </span>
);

export const RowEditActions = ({
  editingKey,
  editRowHandler,
  openFormDesigner,
  deleteRowHandler,
  createDataviewHandler,
  record,
}) => (
  <span data-key={record.key}>
    <Button
      size="small"
      color="primary"
      variant="dashed"
      className="mr-2"
      disabled={editingKey !== ''}
      onClick={() => editRowHandler(record)}
    >
      Edit Form
    </Button>
    <Button
      size="small"
      color="primary"
      variant="dashed"
      className="mr-2"
      disabled={editingKey !== ''}
      onClick={() => createDataviewHandler(record)}
    >
      Create View
    </Button>
    <Button
      size="small"
      color="primary"
      variant="dashed"
      className="mr-2"
      disabled={editingKey !== ''}
      onClick={() => openFormDesigner(record.key)}
    >
      Schema
    </Button>
    <Popconfirm
      title="Sure to Delete this form?"
      onConfirm={() => deleteRowHandler(record)}
    >
      <Button
        size="small"
        color="danger"
        variant="dashed"
        disabled={editingKey !== ''}
      >
        Delete
      </Button>
    </Popconfirm>
  </span>
);
