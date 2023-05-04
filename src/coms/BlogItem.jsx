import { LikeOutlined, EyeOutlined, EditOutlined, MessageOutlined, DeleteOutlined, StarOutlined } from "@ant-design/icons";
import { Col, List, Skeleton, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Row } from "antd";
import Layout from "./TwoColLayout";
import router from '../../router.json';
import { getArticle } from "../api/blog";
import { throttle } from '../hooks/utils'
import { deleteArticle } from "../api/blog";
import Modal from '../coms/Modal';
import classNames from "classnames";

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

const BlogItem = ({ edit, item, darkMode, bgColor, textColor }) => {

  const { id } = item;
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const [article, updateArticle] = useState({})
  const { title, description, avatarUrl, views, likes, favorites, commentsCount, updatedAt } = article;
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const ar = await getArticle({ id, title, description, avatarUrl, views, likes, favorites, commentsCount });
      updateArticle(ar)
      setLoading(false);

    }
    const getRandomDelay = () => {
      if (!window.articleCount) {
        window.articleCount = 200;
      } else {
        window.articleCount += 200;
      }
      return window.articleCount;
    };
    const timer = setTimeout(() => {
      if (id) fetchData();

    }, getRandomDelay())

    return () => {
      window.articleCount = 0;
      clearTimeout(timer);
    };
  }, [])

  const onDelete = async (e) => {
    const status = await deleteArticle(id);
    if (status === 204) {
      message.success("删除成功");
      nav('.');
    } else {
      message.error("删除失败");
    }

  }
  return (
    <Row>
      <Col style={{ marginBottom: '1rem', padding: "1rem 0rem", color: textColor, backgroundColor: darkMode ? "transparent" : bgColor }} xs={24} md={24}>
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
            )}
            RightChild={() =>
              loading ? undefined : (
                <div style={{ overflow: "hidden", maxHeight: "15rem" }} className="Flex-Center">
                  <img style={{ height: "100%", opacity: darkMode ? ".7" : "1" }} src={avatarUrl} />
                </div>
              )
            }
          />
          {edit ? <div>
            <Button style={{ margin: '0 1rem' }} type="primary" size="small" icon={<EditOutlined />} >
              <Link to={`${router.blogs}/update/${id}`}> 编辑</Link>
            </Button>
            <Modal
              visible={modalVisible}
              visibleChange={(v) => setModalVisible(v)}
            >

              <div>
                <div>删除文章</div>
                <div style={{ textAlign: "center" }}><strong >{title}</strong></div>
                <div style={{ justifyContent: "space-between" }} className={classNames("Flex-Center","margin-top-bottom")}> <Button type="primary" onClick={throttle(() => setModalVisible(false), 1000)} size="middle"  >
                  取消
                </Button>
                  <Button type="primary" onClick={throttle(onDelete, 1000)} size="middle" >
                    确认
                  </Button></div>
              </div>
            </Modal>
            <Button type="primary" onClick={throttle(() => setModalVisible(true), 1000)} size="small" icon={<DeleteOutlined />} >
              删除
            </Button>
          </div> : undefined}
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
