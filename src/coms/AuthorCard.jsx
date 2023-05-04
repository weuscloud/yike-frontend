import { Card, Avatar } from "antd";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {getUser} from '../api/user';
const AuthorCard = ({ id,token, textColor, bgColor }) => {

  if(!id)throw 'invalid use:AuthorCard';
  const [author,updateAuthor]=useState({})
  const {name,bio, avatarUrl}=author;
  useEffect(()=>{
    const fetchData=async()=>{
      const a=await getUser({id,name, avatarUrl,bio})
      updateAuthor(a);
    }
    fetchData();
  },[])
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
  token:state.app.token,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(AuthorCard);
