import style from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className={style.errorMessage}>
      {message}
    </div>
  );
};

export default ErrorMessage;
