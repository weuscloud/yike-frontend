import { connect } from "react-redux";
import { Row, Col } from "antd";
import TwoColLayout from "../coms/TwoColLayout";
import BlogList from '../coms/BlogList';
import classNames from "classnames";
import { useBack } from '../hooks/useBack';
import useOperationAndId from "../hooks/useOperationAndId";
import React, { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import LeftBar from '../coms/VerticalMenu';
import Editor from '../coms/Editor';
import Reader from '../coms/Reader';
import router from '../../router.json'
import "../css/Blog.css";



function Blog({ token }) {

  const nav = useNavigate();
  const { operation, id } = useOperationAndId();
  const { '*': path } = useParams();
  const back = useBack();


   //blog center
   if(path.length==0&&!token)
   {
     back();
     return <></>;
   }
   else if (operation && !token)
   {
     nav(router.login);
     return <></>;
   }

  //blogCenter
  if (path.length == 0&&token) {
    return (<Row className={classNames("Flex-Center", "margin-top-bottom")}>
      <Col xs={24} md={20} >
        <TwoColLayout
          rightCol={19}
          LeftChild={() => (<LeftBar location={'blogs'} operation={operation} />)}
          RightChild={()=><BlogList edit channel={'users'}/>}
        />
      </Col>
    </Row>)
  }

  return (
    <Row className={classNames("Flex-Center", "margin-top-bottom")}>
      <Col xs={24} md={20} >
        {operation ? (
          <TwoColLayout
            rightCol={19}
            LeftChild={() => (<LeftBar />)}
            RightChild={() => (<Editor id={id} readOnly={false} />)}
          />) : (
          <Reader id={id}/>)
        }
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({
  token: state.app.token,
});

const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(Blog);
