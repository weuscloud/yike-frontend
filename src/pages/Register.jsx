import { connect } from "react-redux";
import { toggleDarkMode } from "../store/app";
import "../css/Login.css";
import AuthForm from "../coms/AuthForm";
import { Row, Col,Form,Button } from "antd";
import classNames from "classnames";
import TwoColLayout from "../coms/TwoColLayout";
import { Link } from "react-router-dom";
function Register({ darkMode, toggleDarkMode }) {
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
            <AuthForm formType="regist">
                 <Form.Item>
                 <Link to='/login'>已有账号？去登录</Link>
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
});

const mapDispatchToProps = {
  toggleDarkMode,
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
