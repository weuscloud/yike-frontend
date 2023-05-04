import React, { useEffect, useState } from 'react';
import { connect, useSelector } from "react-redux";
import { Input, Form, Button, message, Spin } from 'antd';
import Preview from './Preview';
import useTopTags from "../hooks/useTopTags";
import { createArticle, getArticle, updateArticle } from '../api/blog';
import { throttle } from '../hooks/utils';
import useOperationAndId from '../hooks/useOperationAndId';

function RichTextEditor({ id, bgColor, darkMode, primaryColor, textColor }) {


  const [loading, setLoading] = useState(true);

  const [title, updateTitle] = useState('');
  const [description, updateDesc] = useState('');
  const [content, updateContent] = useState('');
  //tags
  const tags = useTopTags();
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const ar = await getArticle({ id, title, description, content,tags });
      updateTitle(ar.title);
      updateDesc(ar.description);
      updateContent(ar.content);
      setSelectedTags(ar.tags)
      setLoading(false);
    }
    if (id > 0 && id < 1e9) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const { operation } = useOperationAndId();

  const handleTagClick = (tag) => {
    const { id, name } = tag;

    if (selectedTags.some((t) => t.id === id)) {
      setSelectedTags((prevTags) => prevTags.filter((t) => t.id !== id));
    } else {
      setSelectedTags((prevTags) => [...prevTags, { id, name }]);
    }
  };

  const EditorObj = {
    'create': async (form) => {
      try {
        const { id, message: msg } = await createArticle(form);

        if (msg) {
          message.error(`文章创建失败[${msg}]`);
        } else {
          message.success(`文章创建成功[${id}]`);
        }
      } catch (error) {
        message.error("文章创建失败");
      }
    }
    ,
    'update': async (form) => {
      const { id: cbId } = await updateArticle({ id, ...form });

      if (cbId) {
        message.success(`文章编辑成功[${cbId}]`);
      } else {
        message.error(`文章编辑失败`);
      }
    }
  }
  const onFinish = async (fm) => {
    delete fm.content;
    const form = { tags: selectedTags, content, title: fm.title, description: fm.description };
    Object.keys(form).forEach(key => {
      if (typeof form[key] !== 'string' || form[key].length == 0)
        return;
    })
    if (typeof EditorObj[operation] === 'function') {
      EditorObj[operation](form)
    }
  }
  return (
    <div style={{ padding: '2rem', backgroundColor: darkMode ? textColor : bgColor }}>
      <Form
        name="form-generator"
        layout="vertical"
        onFinish={throttle(onFinish, 1000)}
      >
        <Form.Item
          key={'title'}
          label={'标题'}
          name={'title'}
        >
          <Spin spinning={loading}>
            <Input style={{backgroundColor: darkMode ? textColor : bgColor }} max={20} value={title} onChange={(e) => {
              updateTitle(e.target.value)
            }} />
          </Spin>
        </Form.Item>

        <Form.Item
          key={'description'}
          label={'描述'}
          name={'description'}
        >
          <Spin spinning={loading}>
            <Input style={{backgroundColor: darkMode ? textColor : bgColor }} max={60} value={description} onChange={(e) => {
              updateDesc(e.target.value)

            }} />
          </Spin>
        </Form.Item>

        <Form.Item
          key={'content'}
          label={'内容'}
          name={'content'}
        >
          <Preview id={id} text={content} readOnly={false} callback={(val) => {
            updateContent(val)
          }} />
        </Form.Item>


        <Form.Item
          key={'tags'}
          label={'标签'}>
          {tags.map(tag => (
            <Button
              key={tag.id}
              type={selectedTags.some((t) => t.id === tag.id) ? 'primary' : 'default'}
              onClick={() => handleTagClick({ id: tag.id, name: tag.name })}
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