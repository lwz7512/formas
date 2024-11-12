import { useEffect, useRef } from 'react';

import { Input } from 'antd';

export const ReadOnlySumInput = props => {
  const { addons } = props;
  const { dependValues, setValueByPath } = addons;

  const sumerRef = useRef(null);
  // FIXME: cache a mutable value setter to eliminate dead loop!
  // @2024/11/11
  sumerRef.current = setValueByPath;

  const sum = dependValues.reduce((prev, curr) => prev + curr, 0);
  const niceValue = isNaN(sum) ? '' : sum;

  useEffect(() => {
    const niceValue = isNaN(sum) ? '' : sum;
    sumerRef.current('number_sum', niceValue);
  }, [sum, sumerRef]);

  return <Input placeholder="Sum value" readOnly value={niceValue} />;
};
