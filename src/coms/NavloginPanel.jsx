import AuthForm from "./AuthForm";
import Modal from "./Modal";
import React from 'react';
import { Button } from 'antd';
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {setModalVisible } from "../store/app";
import { useState } from "react";
import { Menu } from "antd";
import router from '../../router.json';
const NavloginPanel = ({token}) => {

  //is login or regist page
  const location = useLocation();
  const [formType, setFormType] = useState('login');
  const [visible,setModalVisible]=useState(false);
  const isLoginPage = location.pathname === router.login || location.pathname === router.register ;
  if(isLoginPage)return null;
  //has logined.
  if(token)return null;
  const handleLogin = () => {
    setFormType('login');
    setModalVisible(true);

  };

  const handleRegister = () => {
    setFormType('register');
    setModalVisible(true);
  };
  return (<Menu.Item
    key="userlogin"
    style={{ backgroundColor: "transparent", display: "inline-block" }}
  >
    <>
      <Button
        type="primary"
        onClick={handleLogin}
        style={{ padding: "4px 8px" }}
      >
        登录
      </Button>
      <Modal visibleChange={(visible)=>setModalVisible(visible)} visible={visible}>
        <AuthForm callback={(res) => {
          if (res.status === 200) {
            setModalVisible(false);
          }
        }} formType={formType} />
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
  </Menu.Item>)
}
const mapStateToProps = (state) => ({
  token: state.app.token
});

const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(NavloginPanel);
