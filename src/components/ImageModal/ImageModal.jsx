import ReactModal from "react-modal";
import style from "./ImageModal.module.css";

const ImageModal = ({ modalParams, handleClose }) => {
  return (
    <ReactModal
      isOpen={modalParams.isOpen}
      onRequestClose={handleClose}
      className={style.modalContainer}
      overlayClassName={style.overlayBackground}
      ariaHideApp={false}
      shouldCloseOnEsc={true}
    >
      <img
        src={modalParams.url}
        alt={modalParams.alt}
        className={style.modalImage}
      />
    </ReactModal>
  );
};

export default ImageModal;
