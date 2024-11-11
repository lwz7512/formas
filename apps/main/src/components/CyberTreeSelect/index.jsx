import React from 'react';
import { TreeSelect } from 'antd';

const CyberTreeSelect = (props) => {
  const {
    schema, // get schema of this tree-select control
    value,
    onChange,
    style,
    onItemChange, // 自定义事件处理函数
    ...restProps
  } = props;

  // 合并样式
  const customStyle = {
    width: '20%', // 默认宽度
    ...style, // 外部传入的样式
  };

  // 如果需要处理额外的逻辑，可以在这里实现
  // set tree control value by select node:
  const handleOnChange = (value, label, extra) => {
    console.log(`>>> select node value: ${value}`);
    onChange && onChange(value, label, extra); // 调用 onChange
    onItemChange && onItemChange(value, label, extra); // 调用 onItemChange
  };

  return (
    <TreeSelect
      value={value}
      onChange={handleOnChange} // 使用自定义的 onChange 处理函数
      treeData={schema.treeData} // get tree data from schema
      style={customStyle}
      {...restProps}
    />
  );
};

export default CyberTreeSelect;
