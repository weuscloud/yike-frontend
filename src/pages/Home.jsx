import { connect } from "react-redux";
import { toggleDarkMode } from "../store/app";
import "../css/Home.css";
import BlogList from "../coms/BlogList";

import { Row, Col } from "antd";
import TwoColLayout from "../coms/TwoColLayout";
import AuthorCard from "../coms/AuthorCard";
import classNames from "classnames";
import Carousel from "../coms/Carousel";
function Home() {
  return (
    <Row className={classNames("Flex-Center", "margin-top-bottom")}>
      <Col xs={24} md={20}>
        <TwoColLayout
          LeftChild={() => (
            <>
            <Carousel/>
              <BlogList channel={'pop'} />
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
});

const mapDispatchToProps = {
  toggleDarkMode,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
