import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchFormSchema } from '@/hooks/api-form';

const emptySchema = {
  type: 'object',
  properties: {},
};

export const defaultValue = {
  type: 'object',
  properties: {
    mock_field: {
      title: '简单输入框',
      type: 'string',
    },
  },
};

export const useFormDesigner = () => {
  const [params] = useSearchParams();

  const [formSchema, setFormSchema] = useState(defaultValue);

  const extraButtons = [
    {
      text: 'Save',
      type: 'primary',
      danger: true,
      onClick: () => {
        // * call parent window object to send message:
        window.parent.postMessage(formSchema, '*');
      },
    },
    {
      text: 'Close',
      danger: true,
      onClick: () => {
        // * call parent window object to exit this designer
        window.parent.postMessage(false, '*');
      },
    },
  ];

  const schemaChangeHandler = schema => {
    setFormSchema(schema);
    console.log(`>>> current schema:`);
    console.log(schema);
  };

  // TODO: fetch form schema saved in database by `formid` & `token` ....
  useEffect(() => {
    console.log(`## got params in designer page:`);

    const key = params.get('formid');
    const token = params.get('token');
    // cache toke first for later querying...
    if (token) {
      // console.log(`## got token from url!`);
      localStorage.setItem('formas.jwt', token);
    }

    if (key && token) {
      fetchFormSchema(key).then(resp => {
        if (!resp.data) return console.warn('## no form data returned!');
        const { schema } = resp.data;
        if (schema) {
          // ! FIXME: convert to js obj:
          setFormSchema(JSON.parse(schema)); // show saved schema
        }
      });
    }
  }, [params]);

  return {
    extraButtons,
    formSchema,
    schemaChangeHandler,
  };
};
