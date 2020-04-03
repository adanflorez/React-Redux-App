import React from "react";

const Message = ({ tittle, message }) => {
  return (
    <div className="ui message">
      <div className="header">{tittle}</div>
      <p>{message}</p>
    </div>
  );
};

export default Message;
