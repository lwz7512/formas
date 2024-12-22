import { nanoid } from 'nanoid';

import { SERVICE_HOST_POST as host } from '@/config';

import { useFetchData } from './use-fetch-data';
import { useAsyncPost } from './use-post-data';

export const useBizTreeRoots = () => {
  const rootsState = useFetchData(`${host}/api/sys/trees/roots-table`);
  const { error, datas, loading, refresh } = rootsState;
  return {
    error,
    loading,
    list: datas,
    refresh,
  };
};

export const useBizTreeRootCreate = onRootNodeSuccess => {
  const createState = useAsyncPost();
  const { error, loading, doPost, ...response } = createState;

  const doRootNodeAdd = async (title, description) => {
    // NOTE: Client side uuid generaton:
    const rootid = nanoid();
    // console.log(`>>>> add rooot node: ${title} for root: ${rootid}`);
    const payload = {
      rootid,
      title,
      description,
    };
    const resp = await doPost(`${host}/api/sys/trees/root`, payload);
    if (resp.errCode == 200) {
      onRootNodeSuccess && onRootNodeSuccess();
    }
    return resp;
  };

  return {
    error,
    loading,
    ...response,
    doRootNodeAdd,
  };
};
