import { get, set } from 'lodash';
import FormRender, { useForm } from '@formas/form-render';
import defaultSchema from './schema.json';

/**
 * @deprecated NOT IN USE
 */
const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    input1: {
      title: '正则表达式',
      type: 'string',
      required: true,
      rules: [{ pattern: '^[\u4E00-\u9FA5]+$', message: '请输入中文！' }],
    },
    input2: {
      title: '自定义校验',
      type: 'string',
      rules: [
        {
          validator: (_, value) => {
            const pattern = '^[\u4E00-\u9FA5]+$';
            const result = new RegExp(pattern).test(value);
            return result;
            // 或者是返回一个对象，用于动态设置 message 内容
            // return {
            //   status: result,
            //   message: '请输入中文！',
            // }
          },
          message: '请输入中文！',
        },
      ],
    },
  },
};

export const Demo = () => {
  const form = useForm();

  const rulePath = 'properties.input2.rules[0]';
  const ruleOne = get(defaultSchema, rulePath);
  const { validator, message } = ruleOne;
  const validatorBody = validator.slice(1, -1).join('');
  // build a validator function from string:
  const validatorFunc = new Function('_', 'value', validatorBody);
  // make a deep clone
  const defaultSchemaCopy = JSON.parse(JSON.stringify(defaultSchema));
  // create a new schema with validator function
  const newRule = { message, validator: validatorFunc };
  set(defaultSchemaCopy, rulePath, newRule);
  // console.log(defaultSchemaCopy);

  return <FormRender schema={defaultSchemaCopy} form={form} footer={true} />;
};
