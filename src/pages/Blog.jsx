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
    //blog center
    if(path.length ==0&&!token)
    {
      nav(router.login);
      return;
    }
    //reading
    if(!operation &&id>0&&id<1e9)
    {
      return;
    }
    //illegal
    if (!operation && !id&&path.length>0)
     {
      back();
      return;
     }
    //no token but op
    if (operation && !token)
    {
      nav(router.login);
      return;
    }
  }, [token]);

  //blogCenter
  if (path.length == 0&&token) {
    return (<Row className={classNames("Flex-Center", "margin-top-bottom")}>
      <Col xs={24} md={20} >
        <TwoColLayout
          rightCol={19}
          LeftChild={() => (<LeftBar location={'article'} operation={operation} />)}
          RightChild={()=><BlogList pop={false}/>}
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
          <TwoColLayout
            rightCol={6}
            LeftChild={() => (<Preview articleId={id} readOnly={true} />)}
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
