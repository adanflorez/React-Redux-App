import React from "react";
import { Modal } from "semantic-ui-react";

const InfoModal = props => {
  return (
    <Modal
      open={props.Message}
      header="Reminder!"
      content={props.Message}
      actions={["Snooze", { key: "done", content: "Done", positive: true }]}
    />
  );
};

export default InfoModal;
