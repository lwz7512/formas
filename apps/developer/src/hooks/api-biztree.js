import { SERVICE_HOST_POST as host } from '@/config';

import { useFetchData } from './use-fetch-data';

export const useBizTreeRoots = () => {
  const rootsState = useFetchData(`${host}/api/sys/trees/roots-table`);
  const { error, datas, loading } = rootsState;
  return {
    error,
    loading,
    list: datas,
  };
};
