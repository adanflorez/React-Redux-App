import React, { useEffect } from "react";
import { connect } from "react-redux";

//Components
import StoreForm from "./StoreForm";


import _ from "lodash";
import { fetchStore, updateStore,fetchItems } from "../../state/store/actions";

const EditStoreForm = props => {
  useEffect(() => {
    props.fetchStore(props.match.params.id);
  }, []);

  useEffect(() => {
    if (props.store) {
      props.fetchItems(props.store.id);
    }
  }, [props.store]);

  const onSubmit = storeData => {
    storeData.id = props.store.id;
    props.updateStore(storeData);
  };

  return <StoreForm {...props.store} loading ={props.loading} onSubmitForm={onSubmit} currentItems={props.currentItems}/>;
};

const mapStateToProps = (state, ownProps) => {
  return {
    store: _.find(state.store.stores.list, ["id", +ownProps.match.params.id]),
    currentItems: state.store.currentItems,
    loading: state.store.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStore: storeId => {
      dispatch(fetchStore(storeId));
    },
    updateStore: storeData => {
      dispatch(updateStore(storeData));
    },
    fetchItems:storeId=>{
      dispatch(fetchItems(storeId))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditStoreForm);
