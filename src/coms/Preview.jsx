import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import classNames from 'classnames';
import '../css/Preview.css';
import { getArticle } from "../api/blog";
import { Spin } from 'antd';
const Preview = ({ articleId, callback, readOnly, text, bgColor, darkMode, }) => {

    const [content, setContent] = useState(text);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setContent(text)
        setLoading(false)
    }, [text])
    useEffect(() => {
        const fetchData = async () => {
            const art = await getArticle({ id: articleId, content })
            setContent(art.content)
        }
        if (readOnly) {
            fetchData()
        }
    }, [])
    return (
        <Spin spinning={loading}>
            <ReactQuill
                style={{ backgroundColor: darkMode ? '#fff' : bgColor }}

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
