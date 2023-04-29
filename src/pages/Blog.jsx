import { connect } from "react-redux";
import { toggleDarkMode } from "../store/app";
import "../css/Blog.css";
import { Row, Col } from "antd";
import TwoColLayout from "../coms/TwoColLayout";
import AuthorCard from "../coms/AuthorCard";
import classNames from "classnames";
import { useEffect } from "react";
import { useBack } from '../../hooks/useBack';
import useOperationAndId from "../../hooks/useOperationAndId";

function Blog({ token, darkMode, toggleDarkMode }) {
  const { operation, id } = useOperationAndId();
  const back = useBack()
  useEffect(() => {
    //illegal
    if(!operation&&!id)
      back();
    //no token but op
    if(operation&&!token)
      back();
  }, [token]);

  return (
    <Row className={classNames("Flex-Center", "margin-top-bottom")}>
      <Col xs={24} md={20}>
        {operation}
        {id}
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({
  darkMode: state.app.darkMode,
  token: state.app.token,
});

const mapDispatchToProps = {
  toggleDarkMode,
};
export default connect(mapStateToProps, mapDispatchToProps)(Blog);
