import { Input } from 'antd';
import { useEffect } from 'react';

export const ReadOnlySumInput = ({ addons }) => {
  const { dependValues, setValueByPath } = addons;
  const sum = dependValues.reduce((prev, curr) => prev + curr, 0);
  const niceValue = isNaN(sum) ? '' : sum;

  /**
   * NOTE: watch value change and write back to form data
   */
  useEffect(() => {
    setValueByPath('number_sum', niceValue);
  }, [niceValue]);

  return <Input placeholder="Sum value" readOnly value={niceValue} />;
};
