import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill/dist/quill.snow.css';
import { Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import classNames from 'classnames';
import '../css/Preview.css';
const CustomButton = () => {
    return (
        <button
            className="ql-custom-button"
            onClick={() => console.log('Custom Button Clicked!')}
        >
            tt
        </button>
    );
};
const Preview = ({ readOnly, text, bgColor, darkMode, }) => {
    const [content, setContent] = useState(text);
    return (
        <div >
            <ReactQuill
                style={{ backgroundColor: darkMode ? '#fff' : bgColor }}
                className={classNames(readOnly===true?'non-active':'')}
                theme="snow"
                value={content}
                onChange={(value) => {

                    setContent(value);
                }}
                readOnly={readOnly}
                modules={{
                    toolbar: {
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
        </div>
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
