import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MainMenu from '../MainMenu';
import DrawerComponent from '../DrawerComponent';

import './index.css';

function ConnectedLayout({ children }) {
  const dispatch = useDispatch();

  // 首次渲染时，获取 collection 数据
  useEffect(() => {
    fetch('/collection')
      .then((res) => res.json())
      .then((data) => dispatch.collection.setData(data));
  }, [dispatch]);

  // 首次渲染时，获取 diff 数据
  useEffect(() => {
    fetch('/diff')
      .then((res) => res.json())
      .then((data) => dispatch.diff.setData(data));
  }, [dispatch]);

  return (
    <div className="connected-layout">
      <DrawerComponent />
      <MainMenu />
      {children}
    </div>
  );
}

export default ConnectedLayout;
