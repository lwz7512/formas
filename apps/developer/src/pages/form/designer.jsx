import { App } from 'antd';

import { useXternlFormDesigner } from '@/hooks/use-form-designer';

export const FormSchemaDesigner = () => {
  const { message } = App.useApp();

  const { externalDesignerURL } = useXternlFormDesigner(message);

  return (
    <div className="flex flex-col gap-4 " style={{ height: '77vh' }}>
      <iframe width="100%" height="100%" src={externalDesignerURL}></iframe>
    </div>
  );
};
