import { connect } from "react-redux";
import { Row, Col } from "antd";
import TwoColLayout from "../coms/TwoColLayout";
import AuthorCard from "../coms/AuthorCard";
import classNames from "classnames";
import { useBack } from '../hooks/useBack';
import useOperationAndId from "../hooks/useOperationAndId";
import React, { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import LeftBar from '../coms/VerticalMenu';
import Editor from '../coms/Editor';

import router from '../../router.json'
import "../css/Blog.css";
import Preview from "../coms/Preview";

// blogCenter,show all blogs-->/
// read only,reading one blog   -->/123456789
// edit mode,create/update/delete -->op/123456789
function Blog({ token, bgColor, darkMode }) {

  const nav = useNavigate();
  const { operation, id } = useOperationAndId();
  const { '*': path } = useParams();
  const back = useBack();

  useEffect(() => {
    //illegal
    if (!operation && !id && path.length > 0)
      back();
    //no token but op
    if (operation && !token)
      nav(router.login);
  }, [token]);

  //blogCenter
  if (path.length == 0&&token) {
    return (<Row className={classNames("Flex-Center", "margin-top-bottom")}>
      <Col xs={24} md={20} >
        <TwoColLayout
          rightCol={19}
          LeftChild={() => (<LeftBar location={'article'} operation={operation} />)}
          RightChild={()=><>blog-center</>}
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
            LeftChild={() => (<LeftBar location={'article'} operation={operation} />)}
            RightChild={() => (<Editor readOnly={false} />)}
          />) : (
          <TwoColLayout
            rightCol={6}
            LeftChild={() => (<Preview readOnly={true} />)}
            RightChild={() => (<></>)}
          />)
        }
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({
  darkMode: state.app.darkMode,
  token: state.app.token,
  bgColor: state.theme[state.app.theme].bgColor
});

const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(Blog);
