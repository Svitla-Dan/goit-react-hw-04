import { useState, useEffect } from "react";
import loadImages from "../../getImages";
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
        const { images: fetchedImages } = await loadImages(searchQuery, page);
        setImages((prevImages) => [...prevImages, ...fetchedImages]);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Failed to fetch images. Please try again.");
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

  const openModal = (url, alt) => {
    setModalParams({
      isOpen: true,
      url,
      alt,
    });
  };

  const closeModal = () => {
    setModalParams({
      isOpen: false,
      url: "",
      alt: "",
    });
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {images.length > 0 ? (
        <>
          <ImageGallery images={images} onImageClick={openModal} />
          {!loading && (
            <LoadMoreBtn onClick={() => setPage((prevPage) => prevPage + 1)} />
          )}
        </>
      ) : (
        <p>No images found</p>
      )}
      <ImageModal
        isVisible={modalParams.isOpen}
        imageDetails={{ src: modalParams.url, alt: modalParams.alt }}
        handleClose={closeModal}
      />
    </div>
  );
};

export default App;
