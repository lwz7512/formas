// import React from 'react';
import SchemaBuilder from '@xrenders/schema-builder';

/**
 * FIXME: waiting for formal official release!
 * @date 2024/11/05
 * @returns
 */
export const FormDesigner = () => {
  return (
    <div style={{ height: '80vh' }}>
      <SchemaBuilder importBtn={true} exportBtn={true} pubBtn={false} />
    </div>
  );
};
