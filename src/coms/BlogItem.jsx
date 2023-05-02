import { LikeOutlined,EyeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Col, List, Skeleton } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row } from "antd";
import Layout from "./TwoColLayout";
import router from '../../router.json';
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

const BlogItem = ({ item, loading, darkMode,primaryColor, bgColor, textColor }) => {
const {id,title,description,avatarUrl,views,likes,favorites,commentsCount,updatedAt}=item;
  return (
    <Row>
      
      <Col  style={{marginBottom:'1rem',borderBottom:darkMode?"":`1px solid ${primaryColor}`,padding: "1rem 2rem" , color: textColor, backgroundColor: bgColor }} xs={24} md={24}>
        <Skeleton loading={loading} active>
          <Layout
            LeftChild={() => (
              <List.Item
                key={'title'}
                actions={
                  !loading
                    ? [ 
                    <IconText
                      textColor={textColor}
                      icon={EyeOutlined}
                      text={views}
                      key="list-vertical-like-o"
                    />,
                      <IconText
                          textColor={textColor}
                          icon={LikeOutlined}
                          text={likes}
                          key="list-vertical-like-o"
                        />,
                        <IconText
                          textColor={textColor}
                          icon={StarOutlined}
                          text={favorites}
                          key="list-vertical-star-o"
                        />,
                        
                        <IconText
                          textColor={textColor}
                          icon={MessageOutlined}
                          text={commentsCount}
                          key="list-vertical-message"
                        />,
                      ]
                    : undefined
                }
              >
                <List.Item.Meta
                  title={
                    <span style={{ color: textColor, fontSize: "1.2rem" }}>
                      <Link to={`${router.blogs}/${id}`}>{title}</Link>
                    </span>
                  }
                  description={
                    <span style={{ color: textColor, fontSize: "0.8rem" }}>
                      {description}
                    </span>
                  }
                />
              </List.Item>
            )}
            RightChild={() =>
              loading ? undefined : (
               <div style={{height:"100%",maxHeight:"18rem"}} className="Flex-Center">
                 <img  style={{width:"100%",opacity:darkMode?".7":"1"}}  src={item.avatarUrl} />
               </div>
              )
            }
          />
        </Skeleton>
      </Col>
    </Row>
  )
};

const mapStateToProps = (state) => ({
  darkMode: state.app.darkMode,
  textColor: state.theme[state.app.theme].textColor,
  bgColor: state.theme[state.app.theme].bgColor,
  primaryColor: state.theme[state.app.theme].primaryColor,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(BlogItem);
