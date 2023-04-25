import { Link } from "react-router-dom";
import { Menu, Input, Button,Avatar } from "antd";
import {
  HomeOutlined,
  ProfileOutlined,
  TagOutlined,
  InfoCircleOutlined,
  BulbFilled,
  BulbOutlined,
} from "@ant-design/icons";
import "./Navigation.css";
import { toggleDarkMode,setModalVisible } from "../store/app";
import { connect } from "react-redux";
import Modal from "./Modal";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import AuthForm from "./AuthForm";
const { Search } = Input;
const Navigation = ({ darkMode, toggleDarkMode,setModalVisible }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doLogIn, setDoLogIn] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname.split('/')[1] === 'login'||location.pathname.split('/')[1] === 'regist';
  const handleLogin = () => {
    setDoLogIn(true);
    setModalVisible(true);
    
  };

  const handleRegister = () => {
    setDoLogIn(false);
    setModalVisible(true);
  };
  return (
    <Menu
    defaultSelectedKeys={['home']}
      theme={darkMode ? "dark" : "light"}
      mode="horizontal"
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 10,
      }}
    >
      <Menu.Item style={{ backgroundColor: "transparent" }} key="logo">
        <Link to="/">
          <img src="/favicon.ico" alt="Logo" style={{ height: 30 }} />
        </Link>
      </Menu.Item>
      <Menu.Item key="home" style={{ display: "inline-block" }}>
        <Link to="/">
          <HomeOutlined />
          主页
        </Link>
      </Menu.Item>
      <Menu.Item key="archive" style={{ display: "inline-block" }}>
        <Link to="/archive">
          <ProfileOutlined />
          归档
        </Link>
      </Menu.Item>
      <Menu.Item key="tags" style={{ display: "inline-block" }}>
        <Link to="/tags">
          <TagOutlined />
          标签
        </Link>
      </Menu.Item>
      <Menu.Item key="about" style={{ display: "inline-block" }}>
        <Link to="/about">
          <InfoCircleOutlined />
          关于
        </Link>
      </Menu.Item>
      <Menu.Item style={{ backgroundColor: "transparent" }} key="search">
        <Search
          enterButton
          placeholder="搜索"
          style={{ width: 200 }}
          size="small"
        />
      </Menu.Item>
      {
        isLoginPage?undefined:<Menu.Item
        key="userinfo"
        style={{ backgroundColor: "transparent", display: "inline-block" }}
      >
        {isLoggedIn ? (
          <>
            <Avatar size={32} src={avatarUrl} />
            <span style={{ marginLeft: 8 }}>
              {userName.length > 10
                ? `${userName.slice(0, 10)}`
                : userName.padEnd(10, "\u00A0")}
            </span>
          </>
        ) : (
          <>
            <Button
              type="primary"
              onClick={handleLogin}
              style={{ padding: "4px 8px" }}
            >
              登录
            </Button>
            <Modal>
            <AuthForm  usedInModal={true} formType={doLogIn?"login":"regist"}/>
            </Modal>
            <Button
              type="primary"
              onClick={handleRegister}
              style={{
                padding: "4px 8px",
                marginLeft: 8,
              }}
            >
              注册
            </Button>
          </>
        )}
      </Menu.Item>
      }
      <Menu.Item
        key="darkmode"
        style={{ backgroundColor: "transparent", display: "inline-block" }}
      >
        <Button
          onClick={() => {
            toggleDarkMode();
          }}
          size="middle"
          icon={darkMode ? <BulbFilled /> : <BulbOutlined />}
        />
      </Menu.Item>
    </Menu>
  );
};

const mapStateToProps = (state) => ({
  darkMode: state.app.darkMode,
});

const mapDispatchToProps = {
  setModalVisible,
  toggleDarkMode,
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
