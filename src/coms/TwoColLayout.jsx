import { Row, Col } from 'antd';
import { connect } from "react-redux";
import '../css/TwoColLayout.css';
import classNames from 'classnames';

const TwoColLayout = ({style,LeftChild,RightChild,rightCol,totalCol}) => {

  rightCol=rightCol||8;
  totalCol=totalCol||24;
  return (
    <Row  gutter={[16, 16]}>
      <Col className={classNames('twocoloumslayout')}  xs={24} sm={24} md={totalCol-rightCol}>
      <LeftChild/>
      </Col>
      <Col xs={24} sm={24} md={rightCol}>
      <RightChild/>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({

});


const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(TwoColLayout);

