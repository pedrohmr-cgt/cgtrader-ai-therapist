import React from "react";
import { Layout, Header } from "antd";
import Home from "./pages/Home";

const App = () => {
  return (
    <Layout data-testid="app-wrapper">
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
      <Home />
    </Layout>
  );
};

export default App;
