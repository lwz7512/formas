import { useState, useEffect } from 'react';
import FormRender, { useForm } from '@formas/form-render';

export const Demo = () => {
  const form = useForm();
  const [schema, setSchema] = useState({
    type: 'object',
    column: 2,
    displayType: 'row',
    properties: {
      // ...其他字段
    },
  });
  // ??
  const [data, setData] = useState({
    // ...其他数据
  });

  useEffect(() => {
    const getCodeFromDB = async () => {
      // 假设这是从数据库中获取的代码字符串
      const codeFromDB = `
        return (function updateSchemaAndData(schema, data) {
          // 修改schema和data的逻辑
          schema.properties.newField = {
            type: 'string',
            title: '新字段',
          };
          data.newField = '这是新字段的值';
          return { schema, data };
        })(schema, data);
      `;

      try {
        // 尝试执行代码
        const updateFunction = new Function('schema', 'data', codeFromDB);
        const updated = updateFunction(schema, data);
        // console.log(updated);
        setSchema(updated.schema);
        setData(updated.data);
      } catch (error) {
        console.error('执行数据库代码时出错:', error);
        console.error('错误堆栈:', error.stack);
      }
    };

    getCodeFromDB();
  }, [schema]);

  // 添加额外的日志来检查schema和data的状态
  useEffect(() => {
    // console.log('Current schema:', schema);
    // console.log('Current data:', data);
  }, [schema, data]);

  return (
    <div className="block">
      <h1>Demo 5: create form from DB script</h1>
      <FormRender schema={schema} form={form} />
    </div>
  );
};
