import { useEffect, useState } from 'react';
import { useAsyncFn } from 'react-use';

import { fetchDatasourceList, createDatasources } from './api-datasource';

/**
 * Refreshable data source list hook
 * @returns
 */
export const useDataSourceList = () => {
  const [state, doFetch] = useAsyncFn(async () => {
    const result = await fetchDatasourceList();
    const { datas } = result;
    if (!datas) {
      console.warn(`## No result for data source definition!`);
      return null;
    }
    return datas.map(item => ({ ...item, key: item.id }));
  }, []);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return {
    loading: state.loading,
    dsItems: state.value || [],
    memRefreshDSItems: doFetch,
  };
};

/**
 * use data source api
 * @2025/03/02
 */
export const useDataSource = () => {
  const { dsItems, memRefreshDSItems } = useDataSourceList();

  const [isNewDSOpen, setIsNewDSOpen] = useState(false);
  const [isModifyDSOpen, setIsModifyDSOpen] = useState(false);

  const emptyDS = {
    title: '',
    driver: '',
    host: '',
    port: '',
    database: '',
    instance: '',
    user: '',
    password: '',
  };
  const [datasource, setDatasource] = useState({});

  const onDSFieldChange = (field, value) => {
    setDatasource({ ...datasource, [field]: value });
  };

  /**
   * open new ds modal, and init blank values
   */
  const openNewDSModal = () => {
    setIsNewDSOpen(true);
    setDatasource(emptyDS);
  };
  const closeNewDSModal = () => setIsNewDSOpen(false);
  const closeModifyDSModal = () => setIsModifyDSOpen(false);

  /**
   * refresh datasource list after modal closed
   */
  const handleDSCreation = () => {
    // console.log(datasource);
    closeNewDSModal();
    createDatasources(datasource).then(() => memRefreshDSItems());
  };

  const handleDSUpdate = () => {
    // TODO: ...
  };

  const editDatasource = record => {
    setIsModifyDSOpen(true);
    setDatasource(record);
  };

  const deleteDatasource = record => {
    console.log(`>>> to delete ds:`);
    console.log(record);
    // TODO: ...
  };

  return {
    dsItems,
    datasource,
    isNewDSOpen,
    isModifyDSOpen,
    openNewDSModal,
    closeNewDSModal,
    onDSFieldChange,
    handleDSCreation,
    editDatasource,
    deleteDatasource,
    closeModifyDSModal,
    handleDSUpdate,
  };
};
