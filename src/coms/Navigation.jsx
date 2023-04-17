import { Link } from "react-router-dom";
import { Menu, Input, Button } from "antd";
import {
  HomeOutlined,
  ProfileOutlined,
  TagOutlined,
  InfoCircleOutlined,
  BulbFilled,
  BulbOutlined,
} from "@ant-design/icons";
import "./Navigation.css";
import { toggleDarkMode } from "../store/app";
import { connect } from "react-redux";
const { Search } = Input;
const Navigation = ({ darkMode, toggleDarkMode }) => {
  return (
    <Menu
      theme={darkMode ? "dark" : "light"}
      mode="horizontal"
      style={{ display: "flex", justifyContent: "space-between" ,marginBottom:10}}
    >
      <Menu.Item key="logo">
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
  toggleDarkMode,
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
