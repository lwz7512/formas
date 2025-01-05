import { SERVICE_GATE_API as host } from '@/config';

import { vanillaGetData } from './use-fetch-data';

/**
 * query schema json for defined form
 * @param {string} key form id
 * @returns
 */
export const fetchFormSchema = async key => {
  const url = `${host}/api/formas/forms/${key}`;
  const result = await vanillaGetData(url);
  return result;
};
