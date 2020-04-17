import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import history from "../utils/history";
// css
import { Menu, Dropdown, Icon, Button, Input } from "semantic-ui-react";

// actions
import { logIn, logOut } from "../state/auth/actions";
import { logInFinished } from "../state/auth/actions";

// components
import ErrorModal from "../shared/modals/ErrorModal";

import { useTranslation } from "react-i18next";

const NavMenu = (props) => {
  const { t } = useTranslation();
  
  if (localStorage.getItem("user") && !props.user.isLoggedIn) {
    props.logInFinished(JSON.parse(localStorage.getItem("user")));
  }

  const onLogOut = () => {
    props.logOut();
  };

  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    if (props.user.loginError) {
      setErrorModal(true);
    }
  }, [props.user.loginError]);

  const closeErrorModal = () => {
    setErrorModal(false);
  };

  

  return (
    <>
      <ErrorModal
        Message={props.user.loginError}
        open={errorModal}
        closeErrorModal={() => {
          closeErrorModal();
        }}
      />

      <Menu inverted className="nav-menu">
        <NavLink className="item" to="/dashboard/home" activeClassName="active">
          {t("modules.navbar.home", "Home")}
        </NavLink>
        <NavLink
          className="item"
          to="/dashboard/store"
          activeClassName="active"
        >
          {t("modules.navbar.store", "Store")}
        </NavLink>
        <Menu.Menu position="right">
          {props.user.isLoggedIn && (
            <Dropdown item text={props.user.username}>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    history.push("/dashboard/account/basicinfo");
                  }}
                >
                  <Icon name="user" /> {t("modules.navbar.account", "Account")}
                </Dropdown.Item>
                <Dropdown.Item onClick={onLogOut}>
                  <Icon name="log out" />
                  {t("modules.navbar.logout", "Log out")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}

          {props.user.isLoggedIn !== true && (
            <Menu.Item>
              <Button
                primary
                onClick={() => {
                  history.push("/dashboard/signin");
                }}
              >
                {t("modules.navbar.signin", "Sign In")}
              </Button>
            </Menu.Item>
          )}

          {props.user.isLoggedIn !== true && (
            <Menu.Item>
              <Button
                onClick={() => {
                  history.push("/signup");
                }}
              >
                {t("modules.navbar.signup", "Sign up")}
              </Button>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
    logInFinished: (user) => dispatch(logInFinished(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
