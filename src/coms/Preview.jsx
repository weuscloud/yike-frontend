import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import classNames from 'classnames';
import '../css/Preview.css';
import { getArticle } from "../api/blog";
import { Spin } from 'antd';
import axios from 'axios';
const modules = {
  toolbar: {
    container: [
      [{ 'align': [] }],
      [{ 'header': [1, 2, 3, 4, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }, { 'background': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'font': [] }],
      ['code-block'],
      ['link', 'image', 'video'],
    ],
    handlers: {
      // 点击图片或视频按钮时触发的事件
      image: function () {
        handleFileSelect(this, 'image/*', 'image');
      },
      video: function () {
        handleFileSelect(this, 'video/*', 'video');
      }
    },
  },
};

function handleFileSelect(_, accept, type) {
  // 弹出文件选择对话框
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', accept);
  input.onchange = () => {
    // 上传选择的文件到服务器
    const file = input.files[0];
    const formData = new FormData();
    formData.append(type, file);
    axios.post(`/uploads/${type}`, formData).then((res) => {
      const range = _.quill.getSelection();
      // 插入服务器返回的文件地址到富文本编辑器中
      const fileUrl = res.data.data;
      const typeString = type === 'image' ? 'image' : 'video';
      _.quill.insertEmbed(range.index, typeString, fileUrl, 'user');
    });
  };
  input.click();
}

const Preview = ({ viewed, borderless, articleId, callback, readOnly, text, textColor, bgColor, darkMode, }) => {

  const [content, setContent] = useState(text);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setContent(text)
    setLoading(false)
  }, [text])
  useEffect(() => {
    const fetchData = async () => {
      const art = await getArticle({ id: articleId, content, viewed })
      setContent(art.content)
    }
    if (readOnly && articleId) {
      fetchData()
    }
  }, [])
  return (
    <Spin spinning={loading}>
      <ReactQuill
        style={{ color: textColor }}
        className={classNames(borderless ? 'borderless' : '')}
        theme="snow"
        value={content}
        onChange={(value) => {

          setContent(value);
          if (typeof callback === 'function')
            callback(value);
        }}
        readOnly={readOnly}
        modules={readOnly ? { toolbar: null } : modules}
      />
    </Spin>
  );
};

const mapStateToProps = (state) => ({
  textColor: state.theme[state.app.theme].textColor,
  bgColor: state.theme[state.app.theme].bgColor,
  darkMode: state.app.darkMode,
  primaryColor: state.theme[state.app.theme].primaryColor,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Preview);
