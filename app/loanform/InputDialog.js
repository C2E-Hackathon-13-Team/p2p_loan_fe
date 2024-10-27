import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const InputDialog = ({ onSubmit, defaultValue, visible, onCancel }) => {
  const [inputValue, setInputValue] = useState(defaultValue || '');

  const handleSubmit = () => {
    onSubmit(inputValue);
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          确认
        </Button>,
      ]}
    >
      <Form>
        <Form.Item label="金额(质押到平台)">
          <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InputDialog;