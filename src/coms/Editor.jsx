import React, { useState } from 'react';
import { connect } from "react-redux";
import { Input, Form } from 'antd';
import FormGenerator from './FormGenerator';
import Preview from './Preview';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';


function RichTextEditor({ bgColor, darkMode, primaryColor, textColor }) {
  const [content, setContent] = useState('');
  const [isPreview, setPreview] = useState(true);
  function handleChange(value) {
    setContent(value);
  }
  function handleSubmit() {
    // 在这里执行提交操作
  }
  const names = [
    {
      label: '标题',
      input: {
        required: false,
        rules: [{ max: 20, message: '长度不能超过20个字符' }],
      }
    },
    {
      label: '描述',
      input: {
        required: false,
        rules: [{ max: 60, message: '长度不能超过60个字符' }],
      }
    }
  ];

  return (
    <div style={{ padding: '2rem', backgroundColor: darkMode ? textColor : bgColor }}>
      <FormGenerator names={names}>
        <Form.Item label={'内容'}>

          <Preview readOnly={false} text={'1<script>alert(1)</script>'} />
         
         
        </Form.Item>

      </FormGenerator>
    </div>
  );
}
const mapStateToProps = (state) => ({
  darkMode: state.app.darkMode,
  bgColor: state.theme[state.app.theme].bgColor,
  primaryColor: state.theme[state.app.theme].primaryColor,
  textColor: state.theme[state.app.theme].textColor,
});
const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(RichTextEditor);