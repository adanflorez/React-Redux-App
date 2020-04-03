import React from "react";
import { Modal, Button } from "semantic-ui-react";

const ErrorModal = props => {
  return (
    <Modal open={props.open}>
      <Modal.Header>Error!</Modal.Header>
      <Modal.Content>
        <p>{props.Message}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={()=>{props.closeErrorModal()}}
          positive
          labelPosition="right"
          icon="checkmark"
          content="Aceptar"
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ErrorModal;
