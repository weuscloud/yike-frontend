import React from 'react';
import { Form, Input, Button } from 'antd';

const FormGenerator = ({ names, children }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const renderInputs = () => {
    return names.map(({ label, input }) => (
      <Form.Item
        key={label}
        label={label}
        name={label}
        rules={[{ required: input.required, message: `请输入 ${label}!` }, ...(input.rules || [])]}
      >
       {input.element || <Input />}
      </Form.Item>
    ));
  };

  return (
    <Form
      form={form}
      name="form-generator"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      {renderInputs()}
      {children}
      <Form.Item>
        <Button type="primary" htmlType="submit">
        提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormGenerator;
