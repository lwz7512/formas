import FormRender, { useForm } from '@formas/form-render';
import schema from './schema.json';
import { ReadOnlySumInput } from './sum-input';

export const Demo = () => {
  const form = useForm();

  return (
    <div className="block">
      <h1>Demo 1:</h1>
      <FormRender
        schema={schema}
        form={form}
        widgets={{ roInput: ReadOnlySumInput }}
      />
    </div>
  );
};
