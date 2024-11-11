import FormRender, { useForm } from '@formas/form-render';
import defaultSchema from './schema.json';
import CyberTreeSelect from '../../../components/CyberTreeSelect';
import CyberFileUpload from '../../../components/CyberFileUpload';

export const Demo = () => {
  const form = useForm(); // 确保 useForm 被正确调用
  const widgets = {
    CyberTreeSelect, // 确保组件被正确引用
    CyberFileUpload,
  };

  return (
    <>
      <h1>Demo 10: tree select</h1>
      {/* <CyberTreeSelect treeData={treeData} /> */}
      <FormRender
        form={form} // 确保将 form 实例传递给 FormRender
        schema={defaultSchema}
        widgets={widgets}
        // 其他 props...
      />
    </>
  );
};
