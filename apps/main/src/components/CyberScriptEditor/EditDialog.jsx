import { Modal } from "antd";
import React, { useEffect, useImperativeHandle, useState } from "react";
import JavascriptConsole from "../JavascriptConsole";

const EditDialog = (props) => {
  //用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(props.onRef, () => {
    return {
      onShow: handleShow,
    };
  });

  // 显示或隐藏对话框
  const handleShow = (value) => {
    if (!visible) {
      setValue(value);
      consoleRef.current?.onChangeCode(value);
    }
    setVisible(!visible);
  };

  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(null);
  const consoleRef = React.useRef();

  // 初始化页面加载数据
  useEffect(() => {
    consoleRef.current?.onChangeCode(props.value);
  }, [props]);

  // 提交按钮事件
  const handleSubmit = () => {
    const code = consoleRef.current.onGetCode();
    props.onChangeCode(code);
    setVisible(!visible);
  };

  return (
    <Modal
      title="编辑脚本"
      width={800}
      open={visible}
      onCancel={handleShow}
      onOk={handleSubmit}
      destroyOnClose>
      <div style={{ width: "100%", height: "100%", fontSize: "16px" }}>
        <JavascriptConsole onRef={consoleRef} code={value} />
      </div>
    </Modal>
  );
};

export default EditDialog;
