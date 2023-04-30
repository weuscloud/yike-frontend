import { connect } from "react-redux";
import "../css/Blog.css";
import { Row, Col } from "antd";
import TwoColLayout from "../coms/TwoColLayout";
import AuthorCard from "../coms/AuthorCard";
import classNames from "classnames";
import { useEffect } from "react";
import { useBack } from '../../hooks/useBack';
import useOperationAndId from "../../hooks/useOperationAndId";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import router from '../../router.json'
import LeftBar from '../coms/VerticalMenu';
import Editor from '../coms/Editor';
function Blog({ token, bgColor,darkMode }) {
  const nav=useNavigate();
  const { operation, id } = useOperationAndId();
  const back = useBack()
  useEffect(() => {
    //illegal
    if(!operation&&!id)
      back();
    //no token but op
    if(operation&&!token)
     nav(router.login);
  }, [token]);

  return (
    <Row  className={classNames("Flex-Center", "margin-top-bottom")}>
      <Col xs={24} md={20} >
      <TwoColLayout
        rightCol={19}
          LeftChild={() => (
            <>
           <LeftBar/>
              </>)}
          RightChild={() => (
            <Editor/>
          )}
        />
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({
  darkMode: state.app.darkMode,
  token: state.app.token,
  bgColor:state.theme[state.app.theme].bgColor
});

const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(Blog);
