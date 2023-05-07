import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import MFooter from "./Footer";
import { Layout } from "antd";
import { connect } from "react-redux";
import classNames from "classnames";
const { Header, Content, Footer } = Layout;
const MLayout = ({ darkMode, primaryColor, bgColor }) => {
  useEffect(()=>{
    if(darkMode)
    document.body.classList='bg-dark'
    else{
      document.body.classList='bg-normal'
    }
  },[darkMode])
  return (
    <div
      style={{ backgroundColor: darkMode ? bgColor : primaryColor }}
    >
      <Layout>
        <Header style={{ backgroundColor: bgColor }}>
          <Navigation />
        </Header>
        <Content
          style={{
            backgroundColor: darkMode ? bgColor : primaryColor,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ backgroundColor: bgColor }}>
          <MFooter />
        </Footer>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  darkMode: state.app.darkMode,
  bgColor: state.theme[state.app.theme].bgColor,
  primaryColor: state.theme[state.app.theme].primaryColor,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(MLayout);
