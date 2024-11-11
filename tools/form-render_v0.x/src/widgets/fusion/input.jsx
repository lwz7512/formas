import { Balloon, Icon, Input } from '@alifd/next';
import React from 'react';
import previewContent from '../../components/previewContent';

const previewNode = (format, value) => {
  if (format !== 'image') {
    return null;
  }
  return (
    <Balloon
      trigger={<Icon type="picture" />}
      className="fr-preview"
      align="tl"
    >
      {previewContent(format, value)}
    </Balloon>
  );
};
export default function input(p) {
  const { options = {}, invalid, schema } = p;
  const style = invalid
    ? {
        borderColor: '#ff4d4f',
        boxShadow: '0 0 0 2px rgba(255,77,79,.2)',
        width: '100%',
      }
    : { width: '100%' };
  const { addonBefore, addonAfter, ...rest } = options;
  const { format = 'text', maxLength } = schema;
  const handleChange = value => p.onChange(p.name, value);
  const config = {
    ...rest,
    maxLength,
    showLimitHint: maxLength ? true : false,
  };
  return (
    <Input
      style={style}
      {...config}
      value={p.value}
      disabled={p.disabled || p.readOnly}
      addonTextBefore={addonBefore ? addonBefore : ''}
      addonTextAfter={addonAfter ? addonAfter : previewNode(format, p.value)}
      onChange={handleChange}
    />
  );
}
