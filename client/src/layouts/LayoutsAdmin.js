import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdminLogin from "../pages/admin/Login";
import useAuth from "../hooks/useAuth";

import "./LayoutsAdmin.scss";

export default function LayoutAdmin(props) {
  const { routes } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content, Footer } = Layout;
  const { user, isLoading } = useAuth();

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/admin/login" component={AdminLogin} />
        <Redirect to="/admin/login" />
      </>
    );
  }

  if (user && !isLoading) {
    return (
      <Layout>
        <MenuSider menuCollapsed={menuCollapsed} />
        <Layout
          className="layout-admin"
          style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
        >
          <Header className="layout-admin-header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-admin-content">
            <LoadRoutes routes={routes} />
          </Content>
          <Footer className="layout-admin-footer">Antonio Ramirez</Footer>
        </Layout>
      </Layout>
    );
  }
  return null;
}

function LoadRoutes(props) {
  const { routes } = props;
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
