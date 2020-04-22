import React from "react";
import NavMenu from "./layout/NavMenu";
import { Redirect, Router, Switch, Route } from "react-router-dom";
import history from "./utils/history";

// Components
// import Home from "./modules/home/Home";
// import Store from "./modules/store/Store";
import SignUp from "./modules/auth/SignUp";
import Routes from "./modules/Routes";

import AppStyle from "./AppStyle.css";

function App() {
  return (
    <>
      <Router history={history} basename={"/storewebapp"}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/dashboard" component={Routes} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

{
  /* <Route path="/" exact>
<Redirect to="/home" />
</Route>
<Route path="/signup" component={SingUp} />
<Route path="/home" component={Home} />
<Route path="/store" component={Store} /> */
}
