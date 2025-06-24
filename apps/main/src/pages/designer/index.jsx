import Generator, { defaultCommonSettings } from '@formas/fr-generator';

import { useFormDesigner } from '@/hooks/use-form-designer';

const commonSettings = {
  /** database table column name */
  name: {
    type: 'string',
    title: '英文名称(字段名)',
  },
  ...defaultCommonSettings,
};

/**
 * FIXME: waiting for formal official release!
 * @date 2024/11/05
 * @returns
 */
export const FormDesigner = () => {
  const { extraButtons, formSchema, schemaChangeHandler } = useFormDesigner();
  return (
    <div style={{ height: '99vh' }}>
      <Generator
        hideId={true}
        defaultValue={formSchema}
        extraButtons={extraButtons}
        onSchemaChange={schemaChangeHandler}
        commonSettings={commonSettings}
      />
    </div>
  );
};
