import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { Container } from './App.styled';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { fetchGallery } from 'api.js';
import { GalleryModal } from 'components/Modal/Modal';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { GlobalStyle } from 'components/GlobalStyle';
import generate from 'random-id';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [srcImage, setSrcImage] = useState(null);
  const [total, setTotal] = useState(0);
  const [randomId, setRandomId] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }

    async function getGallery() {
      try {
        setLoading(true);
        setError(false);
        const { hits, totalHits } = await fetchGallery(query, page);
        if (!hits.length) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        setImages(prevState => [...prevState, ...hits]);
        setTotal(totalHits);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getGallery();
  }, [query, page, randomId]);

  const handleSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setRandomId(generate());
  };

  const openModal = image => {
    setShowModal(true);
    setSrcImage(image);
  };

  const closeModal = () => {
    setShowModal(false);
    setSrcImage(null);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Container>
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {error && !loading && toast.error('Oops! Something went wrong!')}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {images.length !== 0 && page < Math.ceil(total / 12) && (
        <Button onClick={handleLoadMore} />
      )}
      {showModal && (
        <GalleryModal
          isOpen={showModal}
          onRequestClose={closeModal}
          image={srcImage}
        />
      )}
      <GlobalStyle />
    </Container>
  );
};
