import { useState } from 'react';

/**
 * use data source api
 * @2025/03/02
 */
export const useDataSource = () => {
  //
  const [isNewDSOpen, setIsNewDSOpen] = useState(false);

  const openNewDSModal = () => setIsNewDSOpen(true);
  const closeNewDSModal = () => setIsNewDSOpen(false);

  const [datasource, setDatasource] = useState({
    title: '',
    driver: '',
    host: '',
    port: '',
    database: '',
    instance: '',
    user: '',
    password: '',
  });

  const onDSFieldChange = (field, value) => {
    setDatasource({ ...datasource, [field]: value });
  };

  const handleDSCreation = () => {
    //
  };

  return {
    datasource,
    isNewDSOpen,
    openNewDSModal,
    closeNewDSModal,
    onDSFieldChange,
    handleDSCreation,
  };
};
