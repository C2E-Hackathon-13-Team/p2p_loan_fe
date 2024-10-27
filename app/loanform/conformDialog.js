import React from 'react';
import { Modal, Form, Button } from 'antd';

const ConformDialog = ({ onSubmit, visible, onCancel }) => {

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
        <Form.Item label="确认收款">
          {/* <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} /> */}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ConformDialog;