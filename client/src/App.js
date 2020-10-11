import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes/routes";
import AuthProvider from "./provider/AuthProvider";
import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RouteSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

function RouteSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component routes={route.routes} {...props} />}
    />
  );
}
export default App;
