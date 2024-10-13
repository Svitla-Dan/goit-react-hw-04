import style from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className={style["errorMessage"]}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
