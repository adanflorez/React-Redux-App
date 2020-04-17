import React, { useState, useCallback, useEffect } from "react";
import { Modal, Button, Grid, Message } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import { useDropzone } from "react-dropzone";
import ReactCrop from "react-image-crop";
import { saveItem, updateItem, deleteItem } from "../../../state/store/actions";

import "react-image-crop/dist/ReactCrop.css";

import { useTranslation } from "react-i18next";

const ItemForm = (props) => {
  const { t } = useTranslation();

  const [preview, setPreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 4 / 4 });
  const [croppedImage, setCroppedImage] = useState("");
  const [imageRef, setImageRef] = useState({
    image: undefined,
    scaleX: 1,
    scaleY: 1,
  });
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setCurrentImage(props.item.image);
  }, [props.item]);

  const closeModal = () => {
    setCroppedImage(undefined);
    setPreview(undefined);
    setCurrentImage(props.item.image);
    props.closeModal();
  };

  const onSubmit = (itemData) => {
    itemData.image = croppedImage;
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

  const onImageLoaded = (image) => {
    setCrop({ aspect: 4 / 4, width: image.width });

    setImageRef({
      image: image,
      scaleX: image.naturalWidth / image.width,
      scaleY: image.naturalHeight / image.height,
    });
    return false;
  };

  const onCropComplete = (crop) => {
    if (imageRef.image && crop.width && crop.height) {
      getCroppedImg(imageRef.image, crop).then((croppedImageUrl) => {
        setCroppedImage(croppedImageUrl);
      });
    }
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    // As Base64 string
    return new Promise((resolve) => {
      resolve(canvas.toDataURL("image/jpeg"));
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    setError(false);
    let file = acceptedFiles[0];
    let urlData = URL.createObjectURL(file);

    var img = new Image();

    img.onload = function () {
      if (img.width < 512 || img.height < 512) {
        setError(true);
        setPreview(undefined);
      } else {
        setDrag(false);
        setPreview(img.src);
      }
    };

    img.src = urlData;
  }, []);

  const onDeleteItem = (itemId) => {
    props.deleteItem(itemId);
    closeModal();
  };
  const { register, errors, handleSubmit } = useForm();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Modal open={props.open}>
      <Modal.Header>{t("modules.item.tittle-creation", "Item Creation")}</Modal.Header>
      <Modal.Content>
        <form
          className={`ui form ${errors && "error"}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid divided>
            <Grid.Row>
              <Grid.Column width={8}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      {currentImage && <img src={currentImage} />}
                      {!preview && !currentImage && (
                        <div
                          {...getRootProps()}
                          onDragOver={() => {
                            setDrag(true);
                          }}
                          onDragLeave={() => {
                            setDrag(false);
                          }}
                          style={{
                            border: "3px dashed rgb(212, 212, 212)",
                            borderRadius: "5px",
                            backgroundColor: drag ? "grey" : "",
                            minHeight: 256,
                          }}
                        >
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <p>Drop the files here ...</p>
                          ) : (
                            <p>
                              Drag 'n' drop some files here, or click to select
                              files
                            </p>
                          )}
                        </div>
                      )}
                      {preview && !currentImage && (
                        <ReactCrop
                          src={preview}
                          crop={crop}
                          onChange={(newCrop) => setCrop(newCrop)}
                          onComplete={onCropComplete}
                          onImageLoaded={onImageLoaded}
                          minHeight={512 / imageRef.scaleY}
                          minWidth={512 / imageRef.scaleX}
                          style={{
                            left: "50%",
                            transform: "translate(-50%, 0)",
                            borderRadius: "5px",
                            border: "1px solid black",
                          }}
                        />
                      )}
                      {error && (
                        <Message negative>
                          <Message.Header>
                            We're sorry we can't upload this iamge
                          </Message.Header>
                          <p>
                            Please provide an image with at least 512px, 512px.
                          </p>
                        </Message>
                      )}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <button
                        onClick={() => {
                          setCroppedImage("");
                          setPreview(undefined);
                          setImageRef({
                            image: undefined,
                            scaleX: 1,
                            scaleY: 1,
                          });
                          setCurrentImage(null);
                        }}
                        className="ui button"
                        type="button"
                      >
                        {t("form.buttons.remove", "Remove")}
                      </button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column width={8}>
                <h3>{t("modules.item.tittle", "Item")}</h3>
                <div className="ui divider"></div>
                <div className="field">
                  <label>{t("modules.item.form.label.name", "Name")}</label>
                  <input
                    type="text"
                    name="name"
                    placeholder={t("modules.item.form.label.name", "Name")}
                    defaultValue={props.item.name}
                    ref={register({ required: true })}
                    // disabled={props.loading}
                  />
                </div>
                {/* Name validation message */}
                {errors.name && errors.name.type === "required" && (
                  <div className="ui error message">
                    <div className="header">{t("form.validationmessages.actionforbidden", "Action forbidden")}</div>
                  <p>{t("form.validationmessages.requiredfield", "This field is required")}</p>
                  </div>
                )}

                <div className="field">
                  <label>{t("modules.item.form.label.description", "Description")}</label>
                  <input
                    type="text"
                    name="description"
                    placeholder={t("modules.item.form.label.description", "Description")}
                    defaultValue={props.item.description}
                    ref={register({ required: true })}
                    // disabled={props.loading}
                  />
                </div>
                {/* Description validation message */}
                {errors.description && errors.description.type === "required" && (
                  <div className="ui error message">
                    <div className="header">{t("form.validationmessages.actionforbidden", "Action forbidden")}</div>
                  <p>{t("form.validationmessages.requiredfield", "This field is required")}</p>
                  </div>
                )}
                <div className="field">
                  <label>{t("modules.item.form.label.price", "Price")}</label>
                  <input
                    type="number"
                    name="price"
                    placeholder={t("modules.item.form.label.price", "Price")}
                    defaultValue={props.item.price}
                    ref={register({ required: true })}
                    // disabled={props.loading}
                  />
                </div>
                {/* Price validation message */}
                {errors.price && errors.price.type === "required" && (
                  <div className="ui error message">
                    <div className="header">{t("form.validationmessages.actionforbidden", "Action forbidden")}</div>
                  <p>{t("form.validationmessages.requiredfield", "This field is required")}</p>
                  </div>
                )}

                <button
                  onClick={closeModal}
                  className="ui button"
                  type="button"
                >
                  {t("form.buttons.cancel", "Cancel")}
                </button>

                <button
                  onClick={() => {
                    onDeleteItem(props.item.id);
                  }}
                  className="ui icon button negative"
                  type="button"
                  style={{ float: "right" }}
                  disabled={!props.item.id}
                >
                  <i className="trash icon"></i>
                </button>
                <Button
                  positive
                  labelPosition="right"
                  icon="checkmark"
                  content={t("form.buttons.save", "Save")}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </form>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return { state: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveItem: (itemData) => {
      dispatch(saveItem(itemData));
    },
    updateItem: (itemData) => {
      dispatch(updateItem(itemData));
    },
    deleteItem: (itemId) => {
      dispatch(deleteItem(itemId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);
