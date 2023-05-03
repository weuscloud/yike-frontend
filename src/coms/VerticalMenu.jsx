import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useLocation,matchPath } from "react-router-dom";
import router from '../../router.json';
import {
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  EditOutlined,
  UploadOutlined,
  PlusOutlined,
  FileOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
const { SubMenu } = Menu;
const MyMenu = () => {
  
  const [selectedKeys, setSelectedKeys] = useState(['']);
  const [openKeys, setOpenKeys] = useState(['']);
  const darkMode=useSelector((state)=>state.app.darkMode);
  const path=useLocation();
  const keys=['blogs','users']
  useEffect(()=>{
    const init=()=>{
      const paths=path.pathname.split('/');
     if(paths[1]){
      const key=paths[1].replace('/','');
      setOpenKeys([`${key}`])
     }
     if(paths[2]){
      setSelectedKeys([`${paths[2]}`])
     }
    }
    init();
  },[])
  const handleSelect = ({ key }) => {
    setSelectedKeys([key]);
  };

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <Menu
    theme={darkMode?'dark':'light'}
      mode="inline"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onSelect={handleSelect}
      onOpenChange={handleOpenChange}
    >
      <SubMenu key="users" icon={<UserOutlined />} title="个人信息">
      <Menu.Item icon={<HomeOutlined />} key="1">个人主页</Menu.Item>
      <Menu.Item icon={<SettingOutlined />} key="2">修改密码</Menu.Item>
      </SubMenu>
      <SubMenu key="blogs" icon={<FileOutlined />} title="文章管理">
        <Menu.Item icon={<PlusOutlined />} key="create">
          写文章
        </Menu.Item>
        <Menu.Item icon={<EditOutlined />} key="update">
          编辑
        </Menu.Item>
        <Menu.Item icon={<UploadOutlined />} key="upload">
          上传
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default MyMenu;
