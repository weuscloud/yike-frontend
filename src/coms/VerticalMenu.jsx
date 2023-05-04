import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useLocation, matchPath, Link } from "react-router-dom";
import router from '../../router.json';
import {
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  EditOutlined,
  SnippetsOutlined,
  PlusOutlined,
  FileOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
const { SubMenu } = Menu;
const MyMenu = () => {

  const [selectedKeys, setSelectedKeys] = useState(['']);

  const [openKeys, setOpenKeys] = useState(['']);

  const darkMode = useSelector((state) => state.app.darkMode);

  const path = useLocation();

  const keys = ['blogs', 'users']
  useEffect(() => {
    const init = () => {

      const paths = path.pathname.split('/');
      //open
      if (paths[1]) {
        const cur = paths[1].replace('/', '');
        setOpenKeys([`${cur}`])
      }
      //op
      if (paths[2]) {
        setSelectedKeys([`${paths[2]}`])
      }
    }

    init();
  }, [])
  const handleSelect = ({ key }) => {
    setSelectedKeys([key]);

  };

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <Menu
      theme={darkMode ? 'dark' : 'light'}
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
      <SubMenu key="blogs" icon={<FileOutlined />} title="文章中心">
        <Menu.Item icon={<PlusOutlined />} key="create">
          <Link to={`${router.blogs}/create/${parseInt((new Date()) / 1000)}`}>
            写文章</Link>
        </Menu.Item>
        <Menu.Item icon={<EditOutlined />} key="update">
          <Link to={`${router.blogs}`}>
            编辑</Link>
        </Menu.Item>

      </SubMenu>
    </Menu>
  );
};

export default MyMenu;
