import React, { useState } from 'react';
import { connect } from "react-redux";
import { Input, Form, Button } from 'antd';
import Preview from './Preview';
import useTopTags from "../hooks/useTopTags";

function RichTextEditor({ readOnly, bgColor, darkMode, primaryColor, textColor }) {
  //content
  const [content, setContent] = useState('');
  //tags
  const tags = useTopTags();
  const [selectedTags, setSelectedTags] = useState([]);
  const handleTagClick = tag => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  const onFinish = (fm) => {
    delete fm.content;
    const form = { tags:selectedTags,content, ...fm };
    console.log(form)
  }
  return (
    <div style={{ padding: '2rem', backgroundColor: darkMode ? textColor : bgColor }}>
      {readOnly ? <Preview readOnly={readOnly} text={'no data'} /> : undefined}
      {readOnly ? undefined : <Form
        name="form-generator"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          key={'title'}
          label={'标题'}
          name={'title'}
        >
          <Input />
        </Form.Item>

        <Form.Item
          key={'description'}
          label={'描述'}
          name={'description'}
        >
          <Input />
        </Form.Item>

        <Form.Item
          key={'content'}
          label={'内容'}
          name={'content'}
        >
          <Preview readOnly={readOnly} callback={(val) => {
            console.log(val)
            setContent(val)
          }} />
        </Form.Item>


        <Form.Item
          key={'tags'}
          label={'标签'}>
          {tags.map(tag => (
            <Button
              key={tag.id}
              type={selectedTags.includes(tag.id) ? 'primary' : 'default'}
              onClick={() => handleTagClick(tag.id)}
              style={{ margin: 5 }}
            >
              {tag.name}
            </Button>
          ))}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>}


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