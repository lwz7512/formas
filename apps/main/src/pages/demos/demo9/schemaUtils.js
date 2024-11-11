import { get, set } from 'lodash';

// schemaUtils.js
import { getEnumFromDataview } from './enumUtils'; // 假设enumUtils.js包含了getEnumFromDataview函数

/**
 * parse validator string from json to javascript function
 * @param {Shecma} schema
 * @param {string} rulePath role object path in schema like: 'properties.input2.rules[0]'
 * @returns schema copy with validator function
 */
export const parseValidatorToFunc = (schema, rulePath) => {
  const ruleOne = get(schema, rulePath);
  const { validator, message } = ruleOne;
  const validatorBody = validator.slice(1, -1).join('');
  // build a validator function from string:
  const validatorFunc = new Function('_', 'value', '{ form }', validatorBody);
  // make a deep clone
  const defaultSchemaCopy = JSON.parse(JSON.stringify(schema));
  const newRule = { message, validator: validatorFunc };
  set(defaultSchemaCopy, rulePath, newRule);

  return defaultSchemaCopy;
};

// 修改schema中enums的值
export const updateSchemaEnums = (form, schema) => {
  // 获取 schema 中的控件列表
  const controls = schema.properties ? Object.entries(schema.properties) : [];
  const newSchema = JSON.parse(JSON.stringify(schema));

  controls.forEach(([key, control]) => {
    if (control.dataview) {
      const { enum: newEnum, enumNames: newEnumNames } = getEnumFromDataview(
        form,
        control.dataview,
        control.dependencies || []
      );
      if (newEnum && newEnumNames) {
        newSchema.properties[key].enum = newEnum;
        newSchema.properties[key].enumNames = newEnumNames;
      }
    }
  });
  return newSchema;
};

// 创建动态监听器
export const createDynamicWatchers = (form, schema, setSchema) => {
  // 获取 schema 中的控件列表
  const controls = schema.properties ? Object.entries(schema.properties) : [];

  // 递归工作，所以它可以处理任意深度的依赖关系
  const clearDependentFields = (schema, changedKey, form, dependencies) => {
    Object.entries(schema.properties).forEach(([key, control]) => {
      if (control.dependencies && control.dependencies.includes(changedKey)) {
        // 清空当前控件的值
        form.setValueByPath(key, undefined);

        // 递归清空子依赖项
        clearDependentFields(schema, key, form, control.dependencies);
      }
    });
  };

  const dynamicWatchers = {};
  controls.forEach(([key, control]) => {
    if (control.dependencies) {
      control.dependencies.forEach((dependencyKey) => {
        dynamicWatchers[dependencyKey] = (value) => {
          const newSchema = { ...schema };
          clearDependentFields(
            newSchema,
            dependencyKey,
            form,
            control.dependencies
          );

          // 更新当前控件的 enum 和 enumNames
          const { enum: newEnum, enumNames: newEnumNames } =
            getEnumFromDataview(form, control.dataview, control.dependencies);
          if (newEnum && newEnumNames) {
            newSchema.properties[key].enum = newEnum;
            newSchema.properties[key].enumNames = newEnumNames;
          }

          // 更新 schema
          setSchema(newSchema);
        };
      });
    }
  });

  return dynamicWatchers;
};

// 创建扩展监听器，用于加入动态执行脚本
export const createExtendedWatchers = (form, codeArray) => {
  let extendedWatchers = {};
  codeArray.forEach((code) => {
    const createWatcherFunction = new Function('form', code);
    const config = createWatcherFunction(form);
    extendedWatchers = { ...extendedWatchers, ...config };
  });
  return extendedWatchers;
};
