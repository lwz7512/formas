import { useState } from 'react';
import { App, Spin } from 'antd';

import { useXternlFormDesigner } from '@/hooks/use-form-designer';

export const FormSchemaDesigner = () => {
  const { message } = App.useApp();

  const { externalDesignerURL } = useXternlFormDesigner(message);

  const [loading, setLoading] = useState(true);

  const onDesignerLoad = () => {
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 " style={{ height: '77vh' }}>
      <Spin spinning={loading} size="large" />
      <iframe
        width="100%"
        height="100%"
        src={externalDesignerURL}
        onLoad={onDesignerLoad}
      ></iframe>
    </div>
  );
};
