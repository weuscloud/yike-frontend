
import { connect } from 'react-redux';
import { Button } from 'antd';
import { toggleDarkMode } from '../store/app';
import '../css/NotFound.css';
function NotFound({ darkMode, toggleDarkMode }) {
      return (
        <div>
          <h1>NotFound</h1>
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
export default connect(mapStateToProps,mapDispatchToProps)(NotFound);
  