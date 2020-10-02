import React from "react";
import { Layout, Tabs } from "antd";
import { Redirect } from "react-router-dom";
import Logo from "../../../assets/images/png/LogoMenuTop.png";
import ResgisterForm from "../../../components/Admin/RegisterForm";
import LoginForm from "../../../components/Admin/LoginForm";

import "./Login.scss";

export default function Login() {
  const { Content } = Layout;
  const { TabPane } = Tabs;
  return (
    <Layout className="login">
      <Content className="login-content">
        <h1 className="login-content-logo">
          <img src={Logo} alt="Antonio Ramirez" />
        </h1>
        <div className="login-content-tabs">
          <Tabs type="card">
            <TabPane tab={<span>Entrar</span>} key="1">
              <LoginForm />
            </TabPane>
            <TabPane tab={<span>Nuevo Usuario</span>} key="2">
              <ResgisterForm />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}
