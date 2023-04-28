import { connect } from "react-redux";
import { toggleDarkMode } from "../store/app";
import "../css/BlogDetail.css";
import { Row, Col } from "antd";
import TwoColLayout from "../coms/TwoColLayout";
import AuthorCard from "../coms/AuthorCard";
import classNames from "classnames";
function BlogDetail({ darkMode, toggleDarkMode }) {
  return (
    <Row  className={classNames("Flex-Center","margin-top-bottom")}>
      <Col xs={24} md={20}>
        <TwoColLayout
          LeftChild={() => <></>}
          RightChild={() => (
            <AuthorCard
              name="wangqicheng"
              avatarUrl="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              bio="张三爱学习"
            />
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
export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);


