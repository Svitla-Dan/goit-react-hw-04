import style from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => {
  return (
    <div className={style.card}>
      <img
        className={style.image}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => onClick(image)}
      />
      <ul className={style.info}>
        <li className={style.author}> {image.user.name}</li>
        <li className={style.likes}>❤️ {image.likes}</li>
      </ul>
    </div>
  );
};

export default ImageCard;
