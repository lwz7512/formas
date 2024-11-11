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
      const baseWatchConfig = {
        '#': val => {
          // 全局监听逻辑
        },
        // 其他已存在的监听函数
      };

      const codeFromDB = [
        `
          return {
            number_a: (val) => {
              const { number_b } = form.getValues('number_b');
              form.setValueByPath('number_sum', val + (number_b || 0));
            },
          };
        `,
        `
          return {
            number_b: (val) => {
              const { number_a } = form.getValues('number_a');
              form.setValueByPath('number_sum', val + (number_a || 0));
            },
          };
        `,
        // 可以在这里添加更多的 watch 配置
      ];

      try {
        // 初始化一个空对象用于存放动态生成的 watch 配置
        let dynamicWatchConfig = {};

        // 遍历 codeFromDB 数组
        codeFromDB.forEach(code => {
          // 为每个字符串创建一个函数，该函数返回 watch 配置对象
          const createWatchConfig = new Function('form', code);
          // 调用 createWatchConfig 函数并传递 form 实例
          const config = createWatchConfig(form);
          // 将结果合并到 dynamicWatchConfig 对象中
          dynamicWatchConfig = { ...dynamicWatchConfig, ...config };
        });

        // 将基础监听配置与动态监听配置合并
        const extendedWatchConfig = {
          ...baseWatchConfig,
          ...dynamicWatchConfig,
        };

        // 设置扩展后的 watch 状态
        setWatch(extendedWatchConfig);
        // 标记为已加载
        setLoaded(true);
      } catch (error) {
        console.error('Error creating watch config:', error);
      }
    }
  }, [form, loaded]);

  return (
    <>
      <h1>Demo7: watch config with each field</h1>
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
