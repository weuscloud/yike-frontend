
import { connect } from 'react-redux';
import { Button } from 'antd';
import { toggleDarkMode } from '../store/app';
import cn from "classnames";
import '../css/BlogEdit.css';
function BlogEdit({ darkMode, toggleDarkMode }) {
      return (
        <div>
          <h1>BlogEdit</h1>
      <Button>Click me</Button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  darkMode: state.app.darkMode
});

const mapDispatchToProps = {
  toggleDarkMode
};
export default connect(mapStateToProps,mapDispatchToProps)(BlogEdit);
  