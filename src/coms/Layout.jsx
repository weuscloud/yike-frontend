import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import MFooter from "./Footer";
import { Layout } from "antd";
import { connect } from "react-redux";
import classNames from "classnames";
const { Header, Content, Footer } = Layout;
const MLayout = ({ darkMode }) => {
  useEffect(() => {
    if (darkMode)
      document.body.classList = 'bg-dark'
    else {
      document.body.classList = 'bg-light'
    }
  }, [darkMode])
  return (
    <Layout>
      <Header className={classNames(darkMode ? 'bg-dark' : 'bg-normal')}>
        <Navigation />
      </Header>
      <Content
        className={classNames(darkMode ? 'bg-dark' : 'bg-normal')}
      >
        <Outlet />
      </Content>
      <Footer className={classNames(darkMode ? 'bg-dark' : 'bg-normal')}>
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
