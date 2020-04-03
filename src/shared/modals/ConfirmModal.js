import React,{useState} from "react";
import { Modal,  Header, Button, Icon } from "semantic-ui-react";

const ActionModal = props => {
  
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
  };


  const onAccept =()=>{
    props.onAccept();
    handleClose();
  }
  const onCancel =()=>{
    handleClose();
  }

  return (
    <Modal trigger={<div onClick={handleOpen}>{props.children}</div>} basic size="small" open={modalOpen}>
      <Header icon="archive" content={props.tittle} />
      <Modal.Content>
        <p>
          {props.description}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted onClick={onCancel}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" inverted onClick={onAccept}> 
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ActionModal;
