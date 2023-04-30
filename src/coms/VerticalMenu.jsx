import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  UserOutlined,
  FileOutlined,
  SettingOutlined,
  EditOutlined,
  UploadOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
const { SubMenu } = Menu;
const MyMenu = () => {
  const [selectedKeys, setSelectedKeys] = useState(['4']);
  const [openKeys, setOpenKeys] = useState(['sub2']);
const darkMode=useSelector((state)=>state.app.darkMode)
  const handleSelect = ({ key }) => {
    setSelectedKeys([key]);
    console.log(key)
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
      <SubMenu key="sub1" icon={<UserOutlined />} title="个人信息">
        <Menu.Item key="1">个人主页</Menu.Item>
        <Menu.Item icon={<SettingOutlined />} key="2">
          修改密码
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<FileOutlined />} title="文章管理">
        <Menu.Item icon={<PlusOutlined />} key="4">
          写文章
        </Menu.Item>
        <Menu.Item icon={<EditOutlined />} key="3">
          编辑
        </Menu.Item>
        <Menu.Item icon={<UploadOutlined />} key="5">
          上传
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default MyMenu;
