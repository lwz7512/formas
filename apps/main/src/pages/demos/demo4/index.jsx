import { useState, useEffect } from 'react';
import FormRender, { useForm } from '@formas/form-render';
import defalutSchema from './schema.json';
import { createWatchConfig } from './createWatchConfig.js';

export const Demo = () => {
  const form = useForm();
  const [schema, setSchema] = useState(defalutSchema);
  const [data, setData] = useState({
    /* 初始 data */
  });
  const [watch, setWatch] = useState({});
  const [loaded, setLoaded] = useState(false);

  // 使用 useEffect 钩子确保在 form 实例初始化之后设置 watch
  useEffect(() => {
    // 确保 form 已经初始化
    if (form) {
      if (!loaded) {
        const watchConfig = createWatchConfig(form);
        setWatch(watchConfig);
        setLoaded(true);
      }
    }
  }, [form]); // 依赖项数组中包含 form，以便在 form 变化时重新运行 effect

  return (
    <div className="block">
      <h2>Demo 4: Dyna load script</h2>
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
