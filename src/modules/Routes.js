import React from "react";
import Home from "./home/Home";
import Store from "./store/Store";

import { Route, Redirect } from "react-router-dom";
import NavMenu from "../layout/NavMenu";

export const Routes = props => {
  return (
    <>
      <NavMenu />
      <div className="ui container">
        <Route path={`${props.match.path}`} exact>
          <Redirect to={`${props.match.path}/home`}/>
        </Route>
        <Route path={`${props.match.path}/home`} component={Home} />
        <Route path={`${props.match.path}/store`} component={Store} />
      </div>
    </>
  );
};

export default Routes;
