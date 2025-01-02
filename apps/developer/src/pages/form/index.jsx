import { App, Button, Divider, Typography, Table } from 'antd';

import { columns } from './columns';
import { AddNewFormModal } from './modals';

import { useFormCRUD } from '@/hooks/use-form';

/**
 * Form meta-data definition page
 * @returns
 */
export const FormDefinePage = () => {
  const { message } = App.useApp();

  const onFormCreatSuccess = () => {
    message.success('New form created!');
  };

  const onFormCreatFailure = () => {
    message.error('New form failed!');
  };

  const {
    forms,
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
        <Table bordered dataSource={forms} columns={columns} />
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
