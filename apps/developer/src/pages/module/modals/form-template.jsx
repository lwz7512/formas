// modals/form-template.jsx
import { Modal, Button, message } from 'antd';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { githubDark } from '@uiw/codemirror-themes-all';
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';

export const FormTemplateModal = forwardRef(
  ({ visible, record, onSave, onCancel, loading }, ref) => {
    const [pythonCode, setPythonCode] = useState(
      '# 请输入Python查询代码\n# 例如: df.query("age > 30")\n'
    );

    // 当record变化时更新代码
    useEffect(() => {
      if (record) {
        setPythonCode(record);
      } else {
        setPythonCode('# 请输入Python查询代码\n# 例如: df.query("age > 30")\n');
      }
    }, [record]);

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
      getPythonCode: () => pythonCode,
      setPythonCode: code => setPythonCode(code),
    }));

    const handleSave = async () => {
      if (!pythonCode.trim() || pythonCode.trim() === '# 请输入Python查询代码') {
        message.error('请输入有效的Python代码');
        return;
      }

      try {
        await onSave({
          pythonCode,
        });
      } catch (error) {
        message.error(error.message || '保存失败');
      }
    };

    return (
      <Modal
        title="自定义触发器编辑"
        open={visible}
        onOk={handleSave}
        onCancel={onCancel}
        confirmLoading={loading}
        width={800}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleSave}
          >
            保存
          </Button>,
        ]}
      >
        <div
          style={{
            marginBottom: 8,
            color: 'rgba(0, 0, 0, 0.88)',
            fontWeight: 'bold',
          }}
        >
          Python代码 <span style={{ color: '#ff4d4f' }}>*</span>
        </div>
        <CodeMirror
          value={pythonCode}
          height="400px"
          extensions={[python()]}
          theme={githubDark}
          onChange={setPythonCode}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            highlightActiveLine: true,
            indentOnInput: true,
            tabSize: 4,
          }}
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: 6,
            overflow: 'hidden',
          }}
        />
        <div style={{ color: 'rgba(0, 0, 0, 0.45)', marginTop: 8 }}>
          编写触发器的Python代码
        </div>
      </Modal>
    );
  }
);
