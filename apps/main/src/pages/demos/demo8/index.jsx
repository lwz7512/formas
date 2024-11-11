import FormRender, { useForm } from '@formas/form-render';
import { useEffect, useState } from 'react';
import defaultSchema from './schema.json';

export const Demo = () => {
  const form = useForm();
  const [schema, setSchema] = useState(defaultSchema);
  const [data, setData] = useState({
    /* 初始 data */
  });
  const [watch, setWatch] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (form && !loaded) {
      // 创建动态监听器
      const createDynamicWatchers = controls => {
        const dynamicWatchers = {};
        controls.forEach(control => {
          console.log(control);
          // 假设每个控件都有一个唯一的 title 属性
          if (control.title) {
            dynamicWatchers[control.title] = value => {
              // 根据控件类型和业务逻辑来定义监听器的行为
              // 以下代码仅为示例，您需要根据实际情况编写逻辑
              console.log(`Value of ${control.title} changed to:`, value);
              // 在这里执行与控件相关的逻辑
            };
          }
        });
        return dynamicWatchers;
      };

      // 获取 schema 中的控件列表
      const controls = schema.properties
        ? Object.values(schema.properties)
        : [];

      // 创建并设置动态监听器
      const dynamicWatchers = createDynamicWatchers(controls);
      setWatch(dynamicWatchers);

      // 标记为已加载
      setLoaded(true);
    }
  }, [form, loaded]);

  return (
    <FormRender
      form={form}
      schema={schema}
      data={data}
      watch={watch}
      // 其他 FormRender 配置...
    />
  );
};
