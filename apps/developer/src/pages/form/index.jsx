import { Button, Divider, Typography, Table } from 'antd';

import { dataSource, columns } from './columns';
import { AddNewFormModal } from './modals';

import { useFormCRUD } from '@/hooks/use-form';

/**
 * Form meta-data definition page
 * @returns
 */
export const FormDefinePage = () => {
  const { isNewFormOpen, openNewFormModal, closeFormModal, createNewForm } =
    useFormCRUD();

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
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
      {/* === New Form Modal === */}
      <AddNewFormModal
        isFormModalOpen={isNewFormOpen}
        handleFormModalClose={closeFormModal}
        handleFormCreation={createNewForm}
      />
    </>
  );
};
