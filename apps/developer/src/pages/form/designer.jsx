import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { App } from 'antd';

import { updateFormDefineSchema } from '@/hooks/api-form';

export const FormSchemaDesigner = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const externalDesignerPage = 'http://localhost:5174/just-form-designer';
  const formId = `formid=${params.get('formid')}`;
  const token = `token=${localStorage.getItem('formas.jwt')}`;
  /**
   * give form designer `formId` & `token` to let it fetch schema and display it!
   */
  const externalDesignerURL = `${externalDesignerPage}?${formId}&${token}`;

  useEffect(() => {
    const designerMessageHandler = async evt => {
      if (evt.data === false) {
        return navigate(-1); // exit designer
      }
      if (evt.data.source) return; // ignore message from `react-devtools-bridge`

      const formId = params.get('formid');
      if (!formId) return console.warn(`## no formid found in page URL!`);

      const resp = await updateFormDefineSchema({
        key: formId,
        schema: evt.data,
      });
      console.log(resp);
      if (resp.errCode == 200) {
        message.success(`form schema saved!`);
      } else {
        message.error(`form schema saving failed!`);
      }
    };

    window.addEventListener('message', designerMessageHandler);

    return () => {
      window.removeEventListener('message', designerMessageHandler);
    };
  }, [navigate, message, params]);

  return (
    <div className="flex flex-col gap-4 " style={{ height: '77vh' }}>
      <iframe width="100%" height="100%" src={externalDesignerURL}></iframe>
    </div>
  );
};
