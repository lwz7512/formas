import { defaultGetValueFromEvent } from './utils';

/**
 * For form-render, a widget is a component that is used to render a form field.
 * @param {*} mapProps - a function that maps the props to the component
 * @param {*} extraSchema - extra schema to be merged with the schema
 * @returns - a component that is used to render a form field
 */
export const createWidget = (mapProps, extraSchema) => Component => props => {
  const { schema, ...rest } = props;
  const _schema = { ...schema, ...extraSchema };

  const propsMap =
    typeof mapProps === 'function'
      ? mapProps({
          schema: _schema,
          ...rest,
        })
      : {};

  const _props = {
    schema: _schema,
    ...rest,
    ...propsMap,
  };

  const finalProps = transformProps(_props);

  return <Component {...finalProps} />;
};

export const transformProps = props => {
  const {
    onChange,
    value,
    defaultValue,
    schema: ownSchema,
    readOnly,
    ...rest
  } = props;
  const schema = { ...ownSchema };
  const { trigger, valuePropName } = schema || {};
  const controlProps = {};
  let _valuePropName = 'value';
  const _value = value === undefined ? defaultValue : value;
  if (valuePropName && typeof valuePropName === 'string') {
    _valuePropName = valuePropName;
    controlProps[valuePropName] = _value;
  } else {
    controlProps.value = _value;
  }
  const _onChange = (...args) => {
    const newValue = defaultGetValueFromEvent(_valuePropName, ...args);
    onChange(newValue);
  };
  if (trigger && typeof trigger === 'string') {
    controlProps.onChange = _onChange;
    controlProps[trigger] = _onChange;
  } else {
    controlProps.onChange = _onChange;
  }

  const usefulPropsFromSchema = {
    disabled: schema.disabled || schema['ui:disabled'],
    readOnly: schema.readOnly || schema['ui:readonly'] || readOnly,
    hidden: schema.hidden || schema['ui:hidden'],
  };

  const _props = {
    ...controlProps,
    schema,
    ...usefulPropsFromSchema,
    ...rest,
  };

  return _props;
};
