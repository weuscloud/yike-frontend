import { Dropdown, Avatar } from 'antd';
import { connect } from "react-redux";
import { updateToken } from '../store/app';
import { Menu } from "antd";
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import router from '../../router.json';
import { message } from 'antd';
import { getUser } from '../api/user';
import jwt_decode from 'jwt-decode';
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
    key: 'articleCenter',
    label: '文章中心',
  },
  {
    key: 'logOut',
    label: '退出登录',
  },
];


const NavInfoPanel = ({ textColor, updateToken,darkMode, bgColor, token }) => {

  //use hooks before if statement
  const location = useLocation();
  const navigate = useNavigate();
  const user =token? jwt_decode(token).user:{};
  const {
    name: username,
    avatarUrl,
    id,
    updatedAt
  } = user;
  useEffect(()=>{
    const fetchUser=async()=>{
     const u=await getUser({id,updatedAt});
    if(u.updatedAt!==updatedAt){
      updateToken({token:null})
    }
    }
    fetchUser()
  },[])
  //is login or regist page
  const isLoginPage = location.pathname === router.login || location.pathname === router.register;
  if (!token||isLoginPage||!user) return <></>;
  const cb = {
    userCenter: ({ id }) => {
      // 处理个人信息的回调函数
      try {
        navigate(`${router.users}/${id}`)
      } catch (error) {

      }
    },
    writeArticle: () => {
      // 处理写文章的回调函数
      try {
        const unixTimestamp = Math.floor(Date.now() / 1000);

        navigate(`${router.blogs}/create/${unixTimestamp}`)
      } catch (error) {

      }
    },
    logOut: () => {
      try {
        console.log('exit')
        updateToken({ token: null })
        message.success(`退出登录成功`);
      } catch (error) {

      }
    },
    articleCenter: ({ id }) => {
      try {
        navigate(`${router.blogs}`)
      } catch (error) {

      }
    }
  };

  const handleMenuClick = (e) => {
    if (typeof cb[e.key] === 'function')
      cb[e.key]({ id })
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
            {username.length > 13
              ? `${username.slice(0, 13)}`
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
  token: state.app.token,
});
const mapDispatchToProps = {
  updateToken
};
export default connect(mapStateToProps, mapDispatchToProps)(NavInfoPanel);