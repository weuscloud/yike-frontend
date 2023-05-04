
import { connect } from 'react-redux';
import { Button } from 'antd';
import '../css/NotFound.css';
function NotFound() {
      return (
        <div>
          <h1>NotFound</h1>
      <Button>Click me</Button>
    </div>
  );
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};
export default connect(mapStateToProps,mapDispatchToProps)(NotFound);
  