import React, { useState } from 'react';
import { connect, useSelector } from "react-redux";
import { Input, Form, Button, message } from 'antd';
import Preview from './Preview';
import useTopTags from "../hooks/useTopTags";
import {createArticle} from '../api/blog';
function throttle(func, delay) {
  let timer = null;
  let lastExecTime = 0;
  return function(...args) {
    const now = Date.now();
    const remainingTime = delay - (now - lastExecTime);
    if (remainingTime <= 0) {
      lastExecTime = now;
      clearTimeout(timer);
      func.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        lastExecTime = Date.now();
        timer = null;
        func.apply(this, args);
      }, remainingTime);
    }
  }
}

function RichTextEditor({ bgColor, darkMode, primaryColor, textColor }) {

  //content
  const [content, setContent] = useState('');
  const token = useSelector(state => state.app.token);

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

  const onFinish = async(fm) => {
    delete fm.content;
    const { user} = JSON.parse(atob(token.split('.')[1]));
    const form = { authorId:user.id,tags: selectedTags, content, title:fm.title,description:fm.description };
    Object.keys(form).forEach(key=>{
      if(typeof form[key]!=='string'||form[key].length==0)
      
      return;
    })
    try {
      const {id}=await createArticle(form);
      message.success(`创建文章${id}成功`);
    } catch (error) {
      message.success("创建文章失败");
    }
  }
  return (
    <div style={{ padding: '2rem', backgroundColor: darkMode ? textColor : bgColor }}>
      <Form
        name="form-generator"
        layout="vertical"
        onFinish={throttle(onFinish,1000)}
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
          <Preview readOnly={false} callback={(val) => {
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
      </Form>

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