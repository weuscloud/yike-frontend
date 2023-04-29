import { connect, useSelector } from "react-redux";
import { toggleDarkMode } from "../store/app";
import "../css/Login.css";
import AuthForm from "../coms/AuthForm";
import { Row, Col, Form } from "antd";
import classNames from "classnames";
import TwoColLayout from "../coms/TwoColLayout";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useBack } from '../../hooks/useBack';

function Login({ token, darkMode, toggleDarkMode }) {
 const back=useBack()
  useEffect(() => {
    if(token)
    back();
  }, [token]);

  return (
    <Row
      style={{ opacity: darkMode ? ".6" : ".8" }}
      className={classNames(
        "Flex-Center",
        "height-100",
        "margin-top-bottom",
        "bg-image"
      )}
    >
      <Col xs={24} md={20}>
        <TwoColLayout
          rightCol={6}
          LeftChild={() => <></>}
          RightChild={() => (
            <AuthForm formType="login">
              <Form.Item>
                <Link to='/'>申诉</Link>
              </Form.Item>
            </AuthForm>
          )}
        />
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({
  darkMode: state.app.darkMode,
  token: state.app.token
});

const mapDispatchToProps = {
  toggleDarkMode,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
