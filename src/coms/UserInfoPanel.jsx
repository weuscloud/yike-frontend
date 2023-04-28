import {  Dropdown ,Avatar} from 'antd';
import { connect } from "react-redux";
import {updateToken}from '../store/app';
import { message } from 'antd';
const cb = {
  personalInfo: () => {
    // 处理个人信息的回调函数
  },
  writeArticle: () => {
    // 处理写文章的回调函数
  },
  logOut: ({updateToken}) => {
    try {
      updateToken({token:null})
      message.success(`退出登录成功`);
    } catch (error) {
      
    }
  },
  goodBye:()=>{

  }
};

const items = [
    {
      key: 'writeArticle',
      label: '写文章',
    },
    {
      key: 'personalInfo',
      label: '个人中心',
    },
    {
      key: 'logOut',
      label: '退出登录',
    },
    {
        key: 'goodBye',
        label: '注销账号',
      },
  ];
  function decodeJWT(payload) {
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  }
  
const UserInfoPanel = ({ textColor,darkMode,bgColor,updateToken,token}) => {
  const handleMenuClick=(e)=>{
    if(typeof cb[e.key] ==='function')
    cb[e.key]({updateToken})
   }

    const {
        name: username,
        avatarUrl,
        id
      } = typeof token==='string' ? decodeJWT(token.split('.')[1]).user : {name:''};
    return (<Dropdown   menu={{
        items,
        selectable: true,
        onClick: handleMenuClick,
        defaultSelectedKeys: ['1'],
        style:{backgroundColor: darkMode?textColor:bgColor }
      }}>
        <div>
            <Avatar size={32} src={avatarUrl} />
            <span style={{ marginLeft: 8 }}>
                {username.length > 10
                    ? `${username.slice(0, 10)}`
                    : username.padEnd(10, "\u00A0")}
            </span>
        </div>
    </Dropdown>
    )
}
const mapStateToProps = (state) => ({
  bgColor: state.theme[state.app.theme].bgColor,
  textColor: state.theme[state.app.theme].textColor,
  darkMode: state.app.darkMode,
  token: state.app.token
});
const mapDispatchToProps = {
  updateToken
};
export default connect(mapStateToProps, mapDispatchToProps)(UserInfoPanel);