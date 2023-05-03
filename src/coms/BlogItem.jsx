import { LikeOutlined, EyeOutlined, EditOutlined, MessageOutlined, DeleteOutlined, StarOutlined } from "@ant-design/icons";
import { Col, List, Skeleton, Button } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row } from "antd";
import Layout from "./TwoColLayout";
import router from '../../router.json';
import { getArticle } from "../api/blog";
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

const BlogItem = ({ edit, item, darkMode, primaryColor, bgColor, textColor }) => {

  const { id } = item;
  const [loading, setLoading] = useState(true);

  const [article, updateArticle] = useState({})
  const { title, description, avatarUrl, views, likes, favorites, commentsCount, updatedAt } = article;
  useEffect(() => {
    const fetchData = async () => {
      const ar = await getArticle({ id, title, description, avatarUrl, views, likes, favorites, commentsCount });
      updateArticle(ar)
      setLoading(false);

    }
    const getRandomDelay = () => {
      return parseInt(100 + Math.random() * 2000);
    };
    const timer = setTimeout(() => {
      fetchData();
    }, getRandomDelay())
    return () => clearTimeout(timer);
  }, [])

  return (
    <Row>
      <Col style={{ marginBottom: '1rem', borderBottom: darkMode ? "" : `1px solid ${primaryColor}`, padding: "1rem 2rem", color: textColor, backgroundColor: bgColor }} xs={24} md={24}>
        <Skeleton loading={loading} active>
          <Layout
            LeftChild={() => (
              <>
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
                          icon={MessageOutlined}
                          text={commentsCount}
                          key="list-vertical-message"
                        />,

                        <IconText
                          textColor={textColor}
                          icon={StarOutlined}
                          text={favorites}
                          key="list-vertical-star-o"
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

              </>
            )}
            RightChild={() =>
              loading ? undefined : (
                <div style={{ height: "100%", maxHeight: "18rem" }} className="Flex-Center">
                  <img style={{ width: "100%", opacity: darkMode ? ".7" : "1" }} src={avatarUrl} />
                </div>
              )
            }
          />
          <div>
            <Button type="primary" size="small" icon={<EditOutlined />} >
              修改
            </Button>
            <Button type="primary" size="small" icon={<DeleteOutlined />} >
              删除
            </Button>
          </div>
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

const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(BlogItem);
