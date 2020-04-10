import React from "react";
import StoreForm from "./StoreForm";
import { saveStore } from "../../state/store/actions";
import { connect } from "react-redux";

const CreateStore = props => {
  const onSubmit = storeData => {
    storeData.user_id = props.user.user_id;
    props.saveStore(storeData);
  };
  return <StoreForm onSubmitForm={onSubmit} loading ={props.loading} />;
};

const mapStateToProps = state => {
  return { user: state.user ,   loading: state.store.loading };
};

const mapDispatchToProps = dispatch => {
  return {
    saveStore: storeData => {
      dispatch(saveStore(storeData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStore);
