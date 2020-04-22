import React from "react";
import Home from "./home/Home";
import Store from "./store/Store";
import SingIn from "./auth/SingIn";
import Account from './account/Account';
import RestorePassword from './auth/RestorePassword';
import ResendConfirmationEmail from './auth/ResendConfirmationEmail';
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
        <Route path={`${props.match.path}/signin`} component={SingIn} />
        <Route path={`${props.match.path}/restorepassword`} component={RestorePassword} />
        <Route path={`${props.match.path}/resendconfirmarionemail`} component={ResendConfirmationEmail} />
        <Route path={`${props.match.path}/account`} component={Account} />
        <Route path={`${props.match.path}/home`} component={Home} />
        <Route path={`${props.match.path}/store`} component={Store} />
      </div>
    </>
  );
};

export default Routes;
