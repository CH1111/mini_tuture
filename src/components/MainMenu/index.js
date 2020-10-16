import React from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, ContactsOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './index.css';
import { COLLECTION_CATALOGUE, COLLECTION_SETTING, CONTACT_US } from '../../constants';

const mapKeyToDrawerType = {
  1: COLLECTION_CATALOGUE,
  2: COLLECTION_SETTING,
  3: CONTACT_US,
};

function MainMenu() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { visible, drawerType, selectedKeys } = useSelector((state) => state.drawer);
  //console.log('selectedKeys', selectedKeys);
  function onLogoClick() {
    dispatch.drawer.setVisible(false);
    history.push('/');
    return;
  }

  function onMenuClick({ key }) {
    const newDrawerType = mapKeyToDrawerType[key];

    if (!visible) {
      dispatch.drawer.setVisible(true);
      dispatch.drawer.setDrawerType(newDrawerType);
      dispatch.drawer.setSelectedKeys([key]);
    } else {
      if (drawerType === newDrawerType) {
        // 用户再次点击同一个菜单按钮，关闭抽屉，取消选择
        dispatch.drawer.setVisible(false);
        dispatch.drawer.setSelectedKeys([]);
      } else {
        dispatch.drawer.setDrawerType(newDrawerType);
        dispatch.drawer.setSelectedKeys([key]);
      }
    }
  }

  return (
    <div className="main-menu">
      <div className="tuture-logo">
        <img
          height="40"
          width="40"
          src="https://tuture.co/images/logo.svg"
          alt=""
          onClick={onLogoClick}
        />
      </div>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={selectedKeys}
        onClick={onMenuClick}
        style={{ zIndex: '1004' }}
      >
        <Menu.Item key="1" title="文集目录" icon={<AppstoreOutlined />}>
          文集目录
        </Menu.Item>
        <Menu.Item key="2" title="文集设置" icon={<SettingOutlined />}>
          文集设置
        </Menu.Item>
        <Menu.Item key="3" title="联系我们" icon={<ContactsOutlined />}>
          联系我们
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default MainMenu;
