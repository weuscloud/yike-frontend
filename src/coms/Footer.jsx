import { Layout } from 'antd';
import { useSelector } from "react-redux";
const { Footer } = Layout;

const MyFooter = () => {

  const darkMode = useSelector((state) => state.app.darkMode);
  const name=darkMode?"dark":"light";
  const bgColor = useSelector((state) => state.theme[name].bgColor);
  const textColor = useSelector((state) => state.theme[name].textColor);
  return (
    <Footer style={{color:textColor,textAlign: 'center',backgroundColor:bgColor}} >
      ©2023 My Company. All Rights Reserved. | 备案号：XXXXXX
    </Footer>
  );
};

export default MyFooter;
