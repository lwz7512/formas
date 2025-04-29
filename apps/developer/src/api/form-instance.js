// src/api/form-instance.js
import httpClient from '@/utils/http-client';

export const createFormInstance = async (formId, formData) => {
  return httpClient.post(`/formas/forms/${formId}/instances`, formData);
};

export const fetchFormInstance = async (formId, instanceId) => {
  const response = await httpClient.get(
    `/formas/forms/${formId}/instances/${instanceId}`,
    {}
  );
  return response;
};

export const updateFormInstance = async (formId, instanceId, formData) => {
  return httpClient.put(
    `/formas/forms/${formId}/instances/${instanceId}`,
    formData
  );
};

export const deleteFormInstance = async (formId, instanceId) => {
  return httpClient.delete(
    `/formas/forms/${formId}/instances/${instanceId}`,
    {}
  );
};
