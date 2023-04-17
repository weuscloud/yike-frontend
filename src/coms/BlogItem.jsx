import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

const IconText = ({ icon, text, textColor }) => (
  <>
    <span style={{ color: textColor }}>
      {React.createElement(icon, {
        style: {
          marginRight: 8,
        },
      })}
      {text}
    </span>
  </>
);

const BlogItem = ({ item, darkMode, bgColor, textColor }) => (
  <List.Item
    style={{ color: textColor, backgroundColor: bgColor }}
    key={item.title}
    actions={[
      <IconText
        textColor={textColor}
        icon={StarOutlined}
        text="156"
        key="list-vertical-star-o"
      />,
      <IconText
        textColor={textColor}
        icon={LikeOutlined}
        text="156"
        key="list-vertical-like-o"
      />,
      <IconText
        textColor={textColor}
        icon={MessageOutlined}
        text="2"
        key="list-vertical-message"
      />,
    ]}
  >
    <Row>
      <Col xs={24} sm={24} md={16}>
        <List.Item.Meta
          title={
            <span  style={{ color: textColor,fontSize:"1.2rem" }}>
              <Link to={`/blog/${item.id}`}>{item.title}</Link>
            </span>
          }
          description={
            <span style={{ color: textColor,fontSize:"0.8rem" }}>{item.description}</span>
          }
        />
         <span style={{ color: textColor,fontSize:"1.0rem" }}>{item.content}</span>
        
      </Col>
      <Col xs={24} sm={24} md={8}>
        <img
          width={"100%"}
          alt="logo"
          src={item.avatarUrl}
        />
      </Col>
    </Row>
  </List.Item>
);

const mapStateToProps = (state) => ({
  darkMode: state.app.darkMode,
  textColor: state.theme[state.app.theme].textColor,
  bgColor: state.theme[state.app.theme].bgColor,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(BlogItem);
