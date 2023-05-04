import { connect } from "react-redux";
import "../css/User.css";
import { Row, Col } from "antd";

import classNames from "classnames";
import { useEffect } from "react";
import { useBack } from '../hooks/useBack';
import useOperationAndId from "../hooks/useOperationAndId";
import React from 'react';
import { useNavigate } from "react-router-dom";
import router from '../../router.json'
function User({ token, bgColor }) {
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
    <Row style={{backgroundColor:bgColor}} className={classNames("Flex-Center", "margin-top-bottom")}>
      <Col xs={24} md={20} >
      {id}
      {operation}
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
export default connect(mapStateToProps, mapDispatchToProps)(User);
