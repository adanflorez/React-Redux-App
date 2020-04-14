import React from "react";
import history from "../../utils/history";

import { connect } from "react-redux";
import moment from "moment";
import defaultImage from "../../assets/images/defaultImage.png";

const StoreItem = props => {
  const renderEditButton = () => {
    if (props.user.user_id === props.store.user_id) {
      return <i className="right floated user icon"></i>;
    }
  };
  return (
    <div
      className="ui card"
      onClick={() => {
        history.push(`store/detail/${props.store.id}`);
      }}
    >
      <div className="image">
        {props.store.image && <img src={props.store.image} alt="" />}
        {!props.store.image && <img src={defaultImage} alt="" />}
      </div>
      <div className="content">
        {renderEditButton()}

        <div className="header">{props.store.name}</div>
        <div className="description">{props.store.description}</div>
      </div>
      <div className="extra content">
        <span className="right floated">
          Created in {moment(props.store.creation_date).year()}
        </span>
        <span>
          <i className="user icon"></i>
          {props.store.items.length} Items
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps, null)(StoreItem);
