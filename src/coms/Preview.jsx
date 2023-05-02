import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import classNames from 'classnames';
import '../css/Preview.css';
import useOperationAndId from "../hooks/useOperationAndId";
import { getArticle } from "../api/blog";
import { Spin } from 'antd';
const Preview = ({ callback, readOnly, text, bgColor, darkMode, }) => {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState(text);
    const { operation, id } = useOperationAndId();
    readOnly = !operation ? true : false;
    useEffect(() => {
        const fetchData = async () => {
          if(id&&id>0&&id<1e9){
            const article = await getArticle(id);
            setContent(article.content || '');
            setLoading(false)
          }else{
            setLoading(false)
          }
        }
        fetchData()
    }, [])
    return (
      <Spin spinning={loading}>
        <ReactQuill
                style={{ backgroundColor: darkMode ? '#fff' : bgColor }}
                className={classNames(readOnly === true ? 'non-active' : '')}
                theme="snow"
                value={content}
                onChange={(value) => {

                    setContent(value);
                    if (typeof callback === 'function')
                        callback(value);
                }}
                readOnly={readOnly}
                modules={{
                    toolbar: readOnly ? null : {
                        container: [
                            [{ header: [1, 2, 3, false] }],
                            [{ color: [] }], // 添加设置颜色的按钮
                            ['bold', 'italic', 'underline'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['link', 'image', 'video'],
                        ]
                    },

                    clipboard: {
                        matchVisual: false,
                    },
                }}
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
