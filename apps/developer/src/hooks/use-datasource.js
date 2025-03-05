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
    // console.log(datasource);
    closeNewDSModal();
    createDatasources(datasource).then(() => memRefreshDSItems());
  };

  return {
    dsItems,
    datasource,
    isNewDSOpen,
    openNewDSModal,
    closeNewDSModal,
    onDSFieldChange,
    handleDSCreation,
  };
};
