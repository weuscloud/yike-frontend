import { connect } from "react-redux";
import { toggleDarkMode } from "../store/app";
import "../css/Login.css";
import LoginForm from "../coms/LoginForm";
import RegistForm from "../coms/RegistForm";
import { Row, Col } from "antd";
import classNames from "classnames";
import TwoColLayout from "../coms/TwoColLayout";
import { useLocation } from "react-router-dom";
function Login({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const isLoginPage = location.pathname.split('/')[1] === 'login';
  return (
    <Row style={{opacity:darkMode?".6":".8"}} className={classNames("Flex-Center","height-100", "margin-top-bottom", "bg-image")}>
      <Col xs={24} md={20}>
        <TwoColLayout
          rightCol={6}
          LeftChild={() => <></>}
          RightChild={() => isLoginPage?<LoginForm />:<RegistForm />}
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
