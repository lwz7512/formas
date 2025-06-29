import Generator, {
  defaultCommonSettings,
  defaultSettings,
} from '@formas/fr-generator';

import { useFormDesigner } from '@/hooks/use-form-designer';

const commonSettings = {
  /** database table column name */
  name: {
    type: 'string',
    title: 'English Name(字段名)',
    placeholder: 'English name and no space',
  },
  ...defaultCommonSettings,
};

const settings = [
  ...defaultSettings,
  {
    title: 'Formas组件',
    widgets: [
      {
        text: 'Presentation列表',
        name: 'presentionList',
        schema: {
          title: 'PresentationTitle',
          type: 'string',
          format: 'color',
        },
        setting: {},
        show: true,
      },
    ],
  },
];

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
        settings={settings}
      />
    </div>
  );
};
