import { useState } from 'react';
import FormRender, { useForm } from '@formas/form-render';
import defalutSchema from './schema.json';
import { createWatchConfig } from './watchConfig'; // 导入 watch 配置

export const Demo = () => {
  const form = useForm();
  const [schema, setSchema] = useState(defalutSchema);
  const [data, setData] = useState({
    /* 初始 data */
  });

  // 使用 createWatchConfig 函数并传递 form 实例来创建 watch 对象
  const watch = createWatchConfig(form);

  return (
    <div className="block">
      <h1>Demo 3:</h1>
      <FormRender
        form={form}
        schema={schema}
        data={data}
        watch={watch}
        // 其他 FormRender 配置...
      />
    </div>
  );
};
