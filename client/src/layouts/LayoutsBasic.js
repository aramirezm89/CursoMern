import React from "react";
import { Route, Switch } from "react-router-dom";
import { Row, Col } from "antd";
import MenuTop from "../components/Web/MenuTop";
import Footer from "../components/Web/Footer";


import "./LayoutsBasic.scss";

export default function LayoutBasic(props) {
  const { routes } = props;

 
  return(
    <>
    <Row>
      <Col lg={4}/>
      <Col lg={16}>
        <MenuTop/>
      
      </Col>
      <Col lg={4}/>
    </Row>
    
      <LoadRoutes routes={routes}></LoadRoutes>
      <Footer/>
    </>
    )



  // return (
  //   <Layout>
  //     <h2>Menu Basic</h2>
  //     <Layout>
  //       <Content>
  //         <LoadRoutes routes={routes}></LoadRoutes>
  //       </Content>
  //       <Footer>Antonio Ramirez Monsalve</Footer>
  //     </Layout>
  //   </Layout>
  // );
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
