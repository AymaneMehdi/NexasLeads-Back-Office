import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Layout, Menu } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  TeamOutlined,
  PieChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import User from "./pages/User";
import Login from "./pages/Login";
import { logout } from "./Redux/actions/Login";
import PrivateRoute from "./PrivateRoute";
import logo1 from "./assets/logo 1.png";
import logo2 from "./assets/logo 2.png";

const { Header, Sider, Content, Footer } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [logo, setLogo] = useState(logo1);
  const dispatch = useDispatch();
  const isAuthenticated = localStorage.getItem("token") !== null;

  const toggleLogo = () => {
    setLogo(logo === logo1 ? logo2 : logo1);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const buttonStyle = {
    backgroundColor: "#d9a74a",
    borderColor: "#d9a74a",
    color: "white",
  };

  // If not authenticated, show only login page
  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            background: "#d9a74a",
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <div className="demo-logo-vertical">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "100%", padding: "20px" }}
            />
          </div>
          <Menu
            mode="inline"
            style={{ background: "#d9a74a" }}
            defaultSelectedKeys={["1"]}
          >
            <Menu.Item
              key="1"
              icon={<PieChartOutlined />}
              style={{
                color: "white",
                background: "#e24545",
                marginTop: "5px",
              }}
            >
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<TeamOutlined />}
              style={{
                color: "white",
                background: "#e24545",
                marginTop: "5px",
              }}
            >
              <Link to="/users">Users</Link>
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<ProductOutlined />}
              style={{
                color: "white",
                background: "#e24545",
                marginTop: "5px",
              }}
            >
              <Link to="/blogs">Blogs</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{ marginLeft: collapsed ? 80 : 200 }}
        >
          <Header
            style={{
              padding: 0,
              background: "#e24545",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => {
                  setCollapsed(!collapsed);
                  toggleLogo();
                }}
                style={{
                  fontSize: "16px",
                  width: 40,
                  height: 40,
                  marginLeft: 12,
                  background: "#d9a74a",
                  color: "white",
                }}
              />
            </div>
            <div>
              <Button
                type="dashed"
                ghost
                style={{ ...buttonStyle, marginRight: "12px" }}
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                LogOut
              </Button>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#EFEFEF",
              flex: "1 0 auto",
            }}
          >
            <Routes>
              <Route
                path="/dashboard"
                element={<PrivateRoute element={Dashboard} />}
              />
              <Route path="/users" element={<PrivateRoute element={User} />} />
              <Route path="/blogs" element={<PrivateRoute element={Blog} />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              background: "#e24545",
              color: "black",
              flexShrink: "0",
            }}
            className="font-bold"
          ></Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
