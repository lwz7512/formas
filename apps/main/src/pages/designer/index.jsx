import Generator from '@formas/fr-generator';

const defaultValue = {
  type: 'object',
  properties: {
    inputName: {
      title: '简单输入框',
      type: 'string',
    },
  },
};

const extraButtons = [{ text: 'Save Schema', type: 'primary', danger: true }];

/**
 * FIXME: waiting for formal official release!
 * @date 2024/11/05
 * @returns
 */
export const FormDesigner = () => {
  return (
    <div style={{ height: '99vh' }}>
      <Generator defaultValue={defaultValue} extraButtons={extraButtons} />
    </div>
  );
};
