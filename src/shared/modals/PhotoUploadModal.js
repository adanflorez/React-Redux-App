import React, { useState, useCallback } from "react";
import { Modal, Button, Message } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const PhotoUploadModal = props => {
  const [preview, setPreview] = useState(null);
  const [crop, setCrop] = useState({ aspect: 4 / 4 });
  const [croppedImage, setCroppedImage] = useState();
  const [imageRef, setImageRef] = useState({
    image: undefined,
    scaleX: 1,
    scaleY: 1
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setCroppedImage(undefined);
    setPreview(undefined);
    setModalOpen(false);
  };

  const onImageLoaded = image => {
    setCrop({ aspect: 4 / 4, width: image.width });

    setImageRef({
      image: image,
      scaleX: image.naturalWidth / image.width,
      scaleY: image.naturalHeight / image.height
    });
    return false;
  };

  const onCropComplete = crop => {
    makeClientCrop(crop);
  };

  const makeClientCrop = crop => {
    if (imageRef.image && crop.width && crop.height) {
      getCroppedImg(imageRef.image, crop).then(croppedImageUrl => {
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
    return new Promise(resolve => {
      resolve(canvas.toDataURL("image/jpeg"));
    });
  };

  const onDrop = useCallback(acceptedFiles => {
    setError(false);
    let file = acceptedFiles[0];
    let urlData = URL.createObjectURL(file);

    var img = new Image();

    img.onload = function() {
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Modal
      trigger={<div onClick={handleOpen}>{props.children}</div>}
      open={modalOpen}
    >
      <Modal.Header>{props.tittle}</Modal.Header>
      <Modal.Content style={{}}>
        {!preview && (
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
              minHeight: 256
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
        )}
        {preview && (
          <ReactCrop
            src={preview}
            crop={crop}
            onChange={newCrop => setCrop(newCrop)}
            onComplete={onCropComplete}
            onImageLoaded={onImageLoaded}
            minHeight={512 / imageRef.scaleY}
            minWidth={512 / imageRef.scaleX}
            style={{
              left: "50%",
              transform: "translate(-50%, 0)",
              borderRadius: "5px",
              border: "1px solid black"
            }}
          />
        )}
        {error && (
          <Message negative>
            <Message.Header>
              We're sorry we can't upload this iamge
            </Message.Header>
            <p>Please provide an image with at least 512px, 512px.</p>
          </Message>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Cancel"
          onClick={() => {
            handleClose();
          }}
          negative
        />
        <Button
          content="Remove"
          onClick={() => {
            setCroppedImage(undefined);
            setPreview(undefined);
            setImageRef({image:undefined, scaleX:1, scaleY:1});
          }}
          icon="trash"
        />
        <Button
          icon="check"
          content="Save"
          onClick={() => {
            if (croppedImage) {
              props.saveImage(croppedImage);
              handleClose();
            }
          }}
          disabled={!croppedImage}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default PhotoUploadModal;
