import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import "./LayoutsBasic.scss";
export default function LayoutBasic(props) {
  const { routes } = props;
  const { Content, Footer } = Layout;
  console.log(routes);

  return (
    <Layout>
      <h2>Menu Basic</h2>
      <Layout>
        <Content>
          <LoadRoutes routes={routes}></LoadRoutes>
        </Content>
        <Footer>Antonio Ramirez Monsalve</Footer>
      </Layout>
    </Layout>
  );
}

function LoadRoutes(props) {
  //Componente que
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
