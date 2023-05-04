import { connect } from "react-redux";
import { toggleDarkMode } from "../store/app";
import "../css/Tag.css";
import BlogList from "../coms/BlogList";

import { Row, Col } from "antd";
import TwoColLayout from "../coms/TwoColLayout";
import AuthorCard from "../coms/AuthorCard";
import classNames from "classnames";
import Carousel from "../coms/Carousel";
import { useParams } from "react-router-dom";
function Tag({ darkMode, toggleDarkMode }) {
  const { 'id': path } = useParams();
  return (
    <Row className={classNames("Flex-Center", "margin-top-bottom")}>
      <Col xs={24} md={20}>
        <TwoColLayout
          LeftChild={() => (
            <>
            <Carousel/>
              <BlogList id={parseInt(path)} channel={'tags'} />
              </>)}
          RightChild={() => (
            <AuthorCard
              id={1}
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
export default connect(mapStateToProps, mapDispatchToProps)(Tag);
