import ReactModal from "react-modal";
import style from "./ImageModal.module.css";

const ImageModal = ({ isVisible, imageDetails, handleClose }) => {
  return (
    <ReactModal
      isOpen={isVisible}
      onRequestClose={handleClose}
      className={style.modalContainer}
      overlayClassName={style.overlayBackground}
      ariaHideApp={false}
      shouldCloseOnEsc={true}
      closeTimeoutMS={250}
    >
      <img
        src={imageDetails.src}
        alt={imageDetails.alt}
        className={style.modalImage}
      />
    </ReactModal>
  );
};

export default ImageModal;
