import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import MFooter from "./Footer";
import { Layout } from "antd";
import { connect } from "react-redux";
const { Header, Content, Footer } = Layout;
const MLayout = ({ darkMode }) => {
  useEffect(() => {
    if (darkMode)
      document.body.classList = 'bg-dark'
    else {
      document.body.classList = 'bg-light'
    }
  },[darkMode])
  return (
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
  );
};

const mapStateToProps = (state) => ({
  darkMode: state.app.darkMode,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(MLayout);
