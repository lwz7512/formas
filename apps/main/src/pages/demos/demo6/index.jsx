import { useState, useEffect } from 'react';
import FormRender, { useForm } from '@formas/form-render';
import defalutSchema from './schema.json';

export const Demo = () => {
  const form = useForm();
  const [schema, setSchema] = useState(defalutSchema);
  const [data, setData] = useState({
    /* 初始 data */
  });
  const [watch, setWatch] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (form && !loaded) {
      const codeFromDB = `
        return {
          '#': (val) => {
            // 可以在这里添加全局监听逻辑
          },
          number_a: (val) => {
            const { number_b } = form.getValues('number_b');
            form.setValueByPath('number_sum', val + (number_b || 0));
          },
          number_b: (val) => {
            const { number_a } = form.getValues('number_a');
            form.setValueByPath('number_sum', val + (number_a || 0));
          },
          // 可以在这里添加更多的 watch 配置
        };
      `;

      try {
        // 使用 new Function 来创建一个函数，该函数返回 watch 配置对象
        const createWatchConfig = new Function('form', codeFromDB);
        // 调用 createWatchConfig 函数并传递 form 实例
        const watchConfig = createWatchConfig(form);
        // 设置 watch 状态
        setWatch(watchConfig);
        // 标记为已加载
        setLoaded(true);
      } catch (error) {
        console.error('Error creating watch config:', error);
      }
    }
  }, [form, loaded]);

  return (
    <>
      <h1>Demo6: watch config with from string</h1>
      <FormRender
        form={form}
        schema={schema}
        data={data}
        watch={watch}
        // 其他 FormRender 配置...
      />
    </>
  );
};
