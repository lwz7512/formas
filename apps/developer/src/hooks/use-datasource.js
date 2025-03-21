import { useEffect, useState } from 'react';
import { useAsyncFn } from 'react-use';

import {
  fetchDatasourceList,
  createDatasources,
  updateDatasources,
  removeDatasources,
  testDatasourcesConnection,
} from './api-datasource';

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
export const useDataSource = notificationInstance => {
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

  /**
   * handle datasource update, and close modify modal after update,
   * if password is not filled, return error message!
   * @2025/03/21
   */
  const handleDSUpdate = () => {
    // check password is filled!
    if (!datasource.password) {
      return notificationInstance.error({ message: 'password is required!' });
    }
    // update datasource
    updateDatasources(datasource)
      .then(() => {
        memRefreshDSItems();
        notificationInstance.success({ message: 'update success!' });
      })
      .catch(error => {
        notificationInstance.error({ message: error.message });
      });
    // close modify modal
    closeModifyDSModal();
  };

  const editDatasource = record => {
    setIsModifyDSOpen(true);
    setDatasource(record);
  };

  const deleteDatasource = record => {
    removeDatasources(record.key).then(() => memRefreshDSItems());
  };

  const testDatasource = record => {
    // console.log(record);
    testDatasourcesConnection(record.key).then(result => {
      console.log(result);
      if (result.errCode === 200) {
        notificationInstance.success({ message: 'connection success!' });
      } else {
        notificationInstance.error({ message: 'connection failed!' });
      }
    });
    notificationInstance.info({ message: 'connection testing...' });
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
    testDatasource,
  };
};
