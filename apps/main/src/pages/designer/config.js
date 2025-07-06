import { defaultCommonSettings, defaultSettings } from '@formas/fr-generator';

export const commonSettings = {
  /** database table column name */
  name: {
    type: 'string',
    title: 'English Name(字段名)',
    placeholder: 'English name and no space',
  },
  ...defaultCommonSettings,
};

export const settings = [
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
