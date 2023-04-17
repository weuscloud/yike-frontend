import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import toc from 'remark-toc';
import rehypeHighlight from 'rehype-highlight';
import { Typography } from 'antd';
import CodeBlock from './CodeBlock';
import { connect } from 'react-redux';
const { Title } = Typography;

const BlogContent = ({ textColor,content,bgColor }) => {
  return (
    <div  style={{ color: textColor, backgroundColor: bgColor }}>
      <Title level={1}>Blog Content</Title>
      <ReactMarkdown
        plugins={[gfm, toc]}
        renderers={{ code: CodeBlock }}
        rehypePlugins={[rehypeHighlight]}
        children={content}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  textColor: state.theme[state.app.theme].textColor,
  bgColor: state.theme[state.app.theme].bgColor,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(BlogContent);
