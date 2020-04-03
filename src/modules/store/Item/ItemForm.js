import React from "react";
import { Modal, Button, Grid, Icon } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import { saveItem, updateItem, deleteItem } from "../../../state/store/actions";

const ItemForm = props => {
  const closeModal = () => {
    props.closeModal();
  };

  const onSubmit = itemData => {
    if (!props.item.id) {
      itemData.store_id = props.storeId;
      props.saveItem(itemData);
    } else {
      itemData.id = props.item.id;
      itemData.store_id = props.item.store_id;
      props.updateItem(itemData);
    }
    closeModal();
  };

  const onDeleteItem = itemId => {
    props.deleteItem(itemId);
    closeModal();
  };

  const { register, errors, handleSubmit } = useForm();
  return (
    <Modal open={props.open}>
      <Modal.Header>Item Creation</Modal.Header>
      <Modal.Content>
        <form
          className={`ui form ${errors && "error"}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid divided>
            <Grid.Row>
              <Grid.Column width={8}>
                <Grid>
                  <Grid.Row></Grid.Row>
                  <Grid.Row></Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column width={8}>
                <h3>Item</h3>
                <div className="ui divider"></div>
                <div className="field">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    defaultValue={props.item.name}
                    ref={register({ required: true })}
                    // disabled={props.loading}
                  />
                </div>
                {/* Name validation message */}
                {errors.name && errors.name.type === "required" && (
                  <div className="ui error message">
                    <div className="header">Action Forbidden</div>
                    <p>This field is required.</p>
                  </div>
                )}

                <div className="field">
                  <label>Description</label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    defaultValue={props.item.description}
                    ref={register({ required: true })}
                    // disabled={props.loading}
                  />
                </div>
                {/* Description validation message */}
                {errors.description && errors.description.type === "required" && (
                  <div className="ui error message">
                    <div className="header">Action Forbidden</div>
                    <p>This field is required.</p>
                  </div>
                )}
                <div className="field">
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    defaultValue={props.item.price}
                    ref={register({ required: true })}
                    // disabled={props.loading}
                  />
                </div>
                {/* Price validation message */}
                {errors.price && errors.price.type === "required" && (
                  <div className="ui error message">
                    <div className="header">Action Forbidden</div>
                    <p>This field is required.</p>
                  </div>
                )}

                <button
                  onClick={closeModal}
                  className="ui button"
                  type="button"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    onDeleteItem(props.item.id);
                  }}
                  className="ui icon button negative"
                  type="button"
                  style={{ float: "right" }}
                >
                  <i className="trash icon"></i>
                </button>
                <Button
                  positive
                  labelPosition="right"
                  icon="checkmark"
                  content="Save"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </form>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = state => {
  return { state: state };
};

const mapDispatchToProps = dispatch => {
  return {
    saveItem: itemData => {
      dispatch(saveItem(itemData));
    },
    updateItem: itemData => {
      dispatch(updateItem(itemData));
    },
    deleteItem: itemId => {
      dispatch(deleteItem(itemId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);
