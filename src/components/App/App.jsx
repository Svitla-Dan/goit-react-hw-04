import { useState, useEffect } from "react";
import loadImages from "../../unsplash-api";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [images, setImages] = useState([]);
  const [modalParams, setModalParams] = useState({
    isOpen: false,
    url: "",
    alt: "",
  });

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }

    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const { images, total } = await loadImages(searchQuery, page);
        if (images.length === 0) {
          setError("There are no images matching your query");
        }
        setImages((prevImages) => [...prevImages, ...images]);
        setShowLoadMore(total > 1 && page !== total);
      } catch (error) {
        setError(`Failed to fetch images: ${error.message} Please try again.`);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, page]);

  const handleSearchSubmit = (query) => {
    if (!query) {
      alert("Please enter a search query!");
      return;
    }
    setSearchQuery(query);
    setImages([]);
    setPage(1);
  };

  const openModal = (image) => {
    setModalParams({
      isOpen: true,
      url: image.urls.regular,
      alt: image.alt_description,
    });
  };

  const closeModal = () => {
    setModalParams({
      isOpen: false,
      url: "",
      alt: "",
    });
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {loading && <Loader />}
      {images.length > 0 && !loading && showLoadMore && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {modalParams.isOpen && (
        <ImageModal modalParams={modalParams} handleClose={closeModal} />
      )}
    </div>
  );
};

export default App;
