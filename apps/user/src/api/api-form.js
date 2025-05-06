import httpClient from '@/lib/http-client';

/**
 * query schema json for defined form
 * @param {string} key form id
 * @returns
 */
export const fetchFormSchema = async key => {
  const url = `/formas/forms/${key}`;
  const response = await httpClient.get(url);
  return response;
};
