import { App, Button, Divider, Form, Typography, Table } from 'antd';

import { EditableCell } from '@/components';

import { useFormList } from '@/hooks/api-form';
import { useFormCRUD } from '@/hooks/use-form';

import { useEditableColumns } from './columns';
import { AddNewFormModal } from './modals';

// == shortcut of designer page! ==
export { FormSchemaDesigner } from './designer';

/**
 * Form meta-data definition page
 * @returns
 */
export const FormDefinePage = () => {
  const { message } = App.useApp();

  const { forms, refreshForms } = useFormList();

  const { columns, form } = useEditableColumns(refreshForms);

  const onFormCreatSuccess = () => {
    message.success('New form created!');
    refreshForms();
  };

  const onFormCreatFailure = () => {
    message.error('New form failed!');
  };

  const {
    isNewFormOpen,
    rootBizSystems,
    openNewFormModal,
    closeFormModal,
    createNewForm,
  } = useFormCRUD(onFormCreatSuccess, onFormCreatFailure);

  return (
    <>
      <div className="flex flex-col gap-4 " style={{ minHeight: '100vh' }}>
        {/* Title */}
        <Typography.Title className="m-0 text-center">
          Form Definition
        </Typography.Title>
        <Divider
          orientation="right"
          style={{
            borderColor: '#7cb305',
          }}
        >
          <Button className="mb-4" type="primary" onClick={openNewFormModal}>
            Create New Form
          </Button>
        </Divider>

        {/* Form list */}
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={forms}
            columns={columns}
            rowClassName="editable-row"
          />
        </Form>
      </div>
      {/* === New Form Modal === */}
      <AddNewFormModal
        isFormModalOpen={isNewFormOpen}
        rootBizSystems={rootBizSystems}
        handleFormModalClose={closeFormModal}
        handleFormCreation={createNewForm}
      />
    </>
  );
};
