import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes/routes";
import "./App.scss";

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <RouteSubRoutes key={index} {...route} />
        ))}
      </Switch>
    </Router>
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
