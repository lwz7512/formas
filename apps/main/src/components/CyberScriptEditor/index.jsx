import React, { useState, useImperativeHandle } from 'react';
import { Button, Input, Space } from "antd";
import EditDialog from './EditDialog';

const CyberScriptEditor = (props) => {
  const { value, onChange } = props;
  console.log('widget props:', props);

  const editDialogRef = React.useRef();
  // 显示修改信息对话框
  const showEditDialog = (value) => {
    editDialogRef.current.onShow(value);
  };

  // 显示修改信息对话框
  const handleChangeCode = (code) => {
    onChange(code);
  };

  return (
    <Space>
      <EditDialog onRef={editDialogRef} onChangeCode={handleChangeCode} />
      <Button onClick={() => showEditDialog(value)}>编辑脚本</Button>
    </Space>
  );
};

export default CyberScriptEditor;