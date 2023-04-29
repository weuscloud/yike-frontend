import { Dropdown, Avatar } from 'antd';
import { connect } from "react-redux";
import { updateToken } from '../store/app';
import { Menu } from "antd";
import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import router from '../../router.json';
import { message } from 'antd';

const items = [
  {
    key: 'writeArticle',
    label: '写文章',
  },
  {
    key: 'userCenter',
    label: '个人中心',
  },
  {
    key: 'logOut',
    label: '退出登录',
  },
  {
    key: 'goodBye',
    label: '注销账号',
  },
];
function decodeJWT(payload) {
  const decodedPayload = JSON.parse(atob(payload));
  return decodedPayload;
}

const NavInfoPanel = ({ textColor, darkMode, bgColor, updateToken, token }) => {

  //use hooks before if statement
  const location = useLocation();
  const navigate = useNavigate();

  //is login or regist page
  const isLoginPage = location.pathname === router.login || location.pathname === router.register;
  if (isLoginPage) return null;
  //has logined.
  if (!token) return null;

  const cb = {
    userCenter: ({id}) => {
      // 处理个人信息的回调函数
      try {
        navigate(`${router.user}/${id}`)
      } catch (error) {

      }
    },
    writeArticle: () => {
      // 处理写文章的回调函数
      try {
        const unixTimestamp = Math.floor(Date.now() / 1000);

        navigate(`${router.blogCreate}/${unixTimestamp}`)
      } catch (error) {

      }
    },
    logOut: () => {
      try {
        updateToken({ token: null })
        message.success(`退出登录成功`);
      } catch (error) {

      }
    },
    goodBye: ({id}) => {
      try {
        navigate(`${router.user}/delete/${id}`)
      } catch (error) {

      }
    }
  };

 
  const {
    name: username,
    avatarUrl,
    id
  } = decodeJWT(token.split('.')[1]).user;
  if (username.length == 0) return null;
  const handleMenuClick = (e) => {
    if (typeof cb[e.key] === 'function')
      cb[e.key]({id})
  }
  return (
    <Menu.Item
      key="userinfo"
      style={{ backgroundColor: "transparent", display: "inline-block" }}
    ><Dropdown menu={{
      items,
      selectable: true,
      onClick: handleMenuClick,
      defaultSelectedKeys: ['1'],
      style: { backgroundColor: darkMode ? textColor : bgColor }
    }}>
        <div>
          <Avatar size={32} src={avatarUrl} />
          <span style={{ marginLeft: 8 }}>
            {username.length > 10
              ? `${username.slice(0, 10)}`
              : username.padEnd(10, "\u00A0")}
          </span>
        </div>
      </Dropdown></Menu.Item>
  )
}
const mapStateToProps = (state) => ({
  bgColor: state.theme[state.app.theme].bgColor,
  textColor: state.theme[state.app.theme].textColor,
  darkMode: state.app.darkMode,
  token: state.app.token
});
const mapDispatchToProps = {
  updateToken
};
export default connect(mapStateToProps, mapDispatchToProps)(NavInfoPanel);