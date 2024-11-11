const fs = require('fs');

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    input1: {
      title: '正则表达式',
      type: 'string',
      required: true,
      rules: [
        { pattern: '^[\u4E00-\u9FA5]+$', message: '请输入中文！' }
      ]
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
          message: '请输入中文！' 
        }
      ]
    }
  }
};

// 转换 validator 函数为字符串，因为 JSON 不支持函数
const schemaWithValidatorString = JSON.stringify(schema, (key, value) => {
  if (typeof value === 'function') {
    return value.toString();
  }
  return value;
}, 2);

fs.writeFileSync('schema.json', schemaWithValidatorString, 'utf8');
