import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { Menu, Dropdown, Grid, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import BasicInfo from "./BasicInfo";
import Security from "./Security";
import AccountConf from "./AccountConf";

import {
  changeName,
  changeEmail,
  changePassword,
  deleteAccount,
  getUserInfo,
} from "../../state/account/actions";

const Account = (props) => {
  const ChangeName = (newName) => {
    props.changeName(newName);
  };

  const ChangeEmail = (newEmail) => {
    props.changeEmail(newEmail);
  };

  const ChangePassword = (data) => {
    props.changePassword(data);
  };

  const deleteAccount = () => {
    props.deleteAccount();
  };

  useEffect(() => {
    props.getUserInfo();
  }, []);

  return (
    <>
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <NavLink
              className="item"
              to={`${props.match.path}/basicinfo`}
              activeClassName="active"
            >
              Basic Info
            </NavLink>
            <NavLink
              className="item"
              to={`${props.match.path}/security`}
              activeClassName="active"
            >
              Security
            </NavLink>
            <NavLink
              className="item"
              to={`${props.match.path}/account`}
              activeClassName="active"
            >
              Account
            </NavLink>
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            <Route path={`${props.match.path}/basicinfo`}>
              <BasicInfo
                ChangeName={ChangeName}
                ChangeEmail={ChangeEmail}
                account={props.account}
              />
            </Route>
            <Route path={`${props.match.path}/security`}>
              <Security
                ChangePassword={ChangePassword}
                account={props.account}
              />
            </Route>
            <Route path={`${props.match.path}/account`}>
              <AccountConf
                deleteAccount={deleteAccount}
                account={props.account}
              />
            </Route>
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return { account: state.account };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => dispatch(getUserInfo()),
    changeName: (newName) => dispatch(changeName(newName)),
    changeEmail: (newEmail) => dispatch(changeEmail(newEmail)),
    changePassword: (newPassword) => dispatch(changePassword(newPassword)),
    deleteAccount: () => dispatch(deleteAccount()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
