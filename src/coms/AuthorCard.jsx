import { Card, Avatar } from "antd";
import { connect } from "react-redux";
const AuthorCard = ({ name, avatarUrl, bio, textColor, bgColor }) => {
  return (
    <Card style={{ border: 0, borderRadius: 0, backgroundColor: bgColor }}>
      <Card.Meta
        avatar={<Avatar size={50} src={avatarUrl} />}
        title={<span style={{ color: textColor }}>{name}</span>}
        description={<span style={{ color: textColor }}>{bio}</span>}
      />
    </Card>
  );
};

const mapStateToProps = (state) => ({
  textColor: state.theme[state.app.theme].textColor,
  bgColor: state.theme[state.app.theme].bgColor,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(AuthorCard);
