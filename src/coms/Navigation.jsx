import { Link } from "react-router-dom";
import { Menu, Input, Button } from "antd";
import React, { useEffect, useState } from "react";
import {
  HomeOutlined,
  ProfileOutlined,
  TagOutlined,
  InfoCircleOutlined,
  BulbFilled,
  BulbOutlined,
} from "@ant-design/icons";
import "../css/Navigation.css";
import { toggleDarkMode, setModalVisible } from "../store/app";
import { connect } from "react-redux";
import NavInfoPanel from './NavInfoPanel';
import NavloginPanel from "./NavloginPanel";
import { getTopTags } from '../api/tag';
import classNames from "classnames";
import useTopTags from "../hooks/useTopTags";
import router from '../../router.json'
const { Search } = Input;
const Navigation = ({ darkMode, toggleDarkMode }) => {

  const topTags=useTopTags();
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
      {topTags && topTags.map((tag) => (
        <Menu.Item className={classNames('inlineBlock')} key={tag.id}>
           <Link to={`${router.tags}/${tag.id}`}>
           {tag.name}
        </Link>
          </Menu.Item>
      ))}
      <Menu.Item style={{ backgroundColor: "transparent" }} key="search">
        <Search
          enterButton
          placeholder="搜索"
          style={{ width: 200 }}
          size="small"
        />
      </Menu.Item>
      <NavInfoPanel />
      <NavloginPanel />
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
  token: state.app.token
});

const mapDispatchToProps = {
  setModalVisible,
  toggleDarkMode,
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
