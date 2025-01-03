import { Form, Table } from 'antd';

import { EditableCell } from '@/components';

import { useEditableColumns } from './columns';

/**
 * Editable Tabel
 * @returns
 */
export const EdiTable = ({ list }) => {
  const { data, mergedColumns, form, cancelChangeHandler } =
    useEditableColumns(list);

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancelChangeHandler,
        }}
      />
    </Form>
  );
};
