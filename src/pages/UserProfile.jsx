import { connect } from "react-redux";
import { Button } from "antd";
import { toggleDarkMode } from "../store/app";
import cn from "classnames";
import "../css/UserProfile.css";
function UserProfile({ darkMode, toggleDarkMode }) {
  return (
    <>
      <h1>UserProfile</h1>
      <Button>Click me</Button>
    </>
  );
}

const mapStateToProps = (state) => ({
  darkMode: state.app.darkMode,
});

const mapDispatchToProps = {
  toggleDarkMode,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
