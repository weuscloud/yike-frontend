import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Col, List, Skeleton } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row } from "antd";
import Layout from "./TwoColLayout";
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

const BlogItem = ({ item, loading, darkMode,primaryColor, bgColor, textColor }) => (
  <Row>
    <Col  style={{marginBottom:'1rem',borderBottom:darkMode?"":`1px solid ${primaryColor}`,padding: "1rem 2rem" , color: textColor, backgroundColor: bgColor }} xs={24} md={24}>
      <Skeleton loading={loading} active>
        <Layout
          LeftChild={() => (
            <List.Item
              key={item.title}
              actions={
                !loading
                  ? [
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
                    ]
                  : undefined
              }
            >
              <List.Item.Meta
                title={
                  <span style={{ color: textColor, fontSize: "1.2rem" }}>
                    <Link to={`/blog/${item.id}`}>{item.title}</Link>
                  </span>
                }
                description={
                  <span style={{ color: textColor, fontSize: "0.8rem" }}>
                    {item.description}
                  </span>
                }
              />
              <span style={{ color: textColor, fontSize: "1.0rem" }}>
                {item.content}
              </span>
            </List.Item>
          )}
          RightChild={() =>
            loading ? undefined : (
             <div style={{height:"100%",maxHeight:"18rem"}} className="Flex-Center">
               <img  style={{width:"100%",opacity:darkMode?".7":"1"}} alt="logo" src={item.avatarUrl} />
             </div>
            )
          }
        />
      </Skeleton>
    </Col>
  </Row>
);

const mapStateToProps = (state) => ({
  darkMode: state.app.darkMode,
  textColor: state.theme[state.app.theme].textColor,
  bgColor: state.theme[state.app.theme].bgColor,
  primaryColor: state.theme[state.app.theme].primaryColor,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(BlogItem);
