import { get, set } from 'lodash';

import { useEffect, useState } from 'react';

import FormRender, { useForm } from '@formas/form-render';
import { DynaOptionSelect } from './dyna-select';
import schema from './schema.json';

const dropSelectFiled = 'select_time';
const url = `/json/${dropSelectFiled}.json`;
const selectPath = `properties.${dropSelectFiled}`;

export const Demo = () => {
  const form = useForm();
  const [dynaSelectSchema, setDynaSelectSchema] = useState(schema);

  useEffect(() => {
    fetch(url).then(data => {
      data.json().then(result => {
        const selectField = get(dynaSelectSchema, selectPath);
        const selectCopy = { ...selectField };
        selectCopy['enum'] = result.map(it => it.value);
        selectCopy['enumNames'] = result.map(it => it.name);
        const schemaCopy = { ...dynaSelectSchema };
        set(schemaCopy, selectPath, selectCopy);
        setDynaSelectSchema(schemaCopy);
      });
    });
  }, []);

  return (
    <div className="block">
      <h1>Demo 2:</h1>
      <FormRender
        schema={dynaSelectSchema}
        form={form}
        widgets={{ DynaOptionSelect }}
      />
    </div>
  );
};
