import React from "react";
import { Route } from "react-router-dom";

import StoreMainPage from "./StoreMainPage";
import EditStore from "./EditStore";
import CreateStore from "./CreateStore";
import StoreDetail from './StoreDetail';

const Store = props => {
  return (
    <>
      <Route path={`${props.match.path}`} component={StoreMainPage} exact/>
      <Route path={`${props.match.path}/detail/:id`} component={StoreDetail} />
      <Route path={`${props.match.path}/edit/:id`} component={EditStore} />
      <Route path={`${props.match.path}/new`} component={CreateStore} />
    </>
  );
};

export default Store;
