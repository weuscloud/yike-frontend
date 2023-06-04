import { Layout,Divider } from 'antd';
import { useSelector } from "react-redux";
const { Footer } = Layout;
import packageFile from '../../package.json';
const MyFooter = () => {

  const darkMode = useSelector((state) => state.app.darkMode);
  const name=darkMode?"dark":"light";
  const bgColor = useSelector((state) => state.theme[name].bgColor);
  const textColor = useSelector((state) => state.theme[name].textColor);
  return (
    <Footer style={{color:textColor,textAlign: 'center',backgroundColor:bgColor}} >
      {packageFile.name} with GPT-3.5
      <Divider type="vertical" />
      {packageFile.version}
      <Divider type="vertical" /> 
      备案号：{packageFile.record}{<br/>}
      Copyright © 2023 Wang Qi-Cheng. All Rights Reserved. 
      
    </Footer>
  );
};

export default MyFooter;
