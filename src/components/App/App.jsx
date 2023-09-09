import { Component } from 'react';
import toast from 'react-hot-toast';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { Container } from './App.styled';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { getGallery } from 'api.js';
import { GalleryModal } from 'components/Modal/Modal';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { GlobalStyle } from 'components/GlobalStyle';
import generate from 'random-id';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    showModal: false,
    error: false,
    loading: false,
    srcImage: null,
    total: 0,
    randomId: '',
    showBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.randomId !== this.state.randomId ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true, error: false });
      getGallery(this.state.query, this.state.page)
        .then(({ hits, totalHits }) => {
          if (!hits.length) {
            toast.error(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
          }
          const newImages = [...prevState.images, ...hits];
          const showBtn = this.state.page < Math.ceil(totalHits / 12);

          this.setState({
            images: newImages,
            total: totalHits,
            showBtn,
          });
        })
        .catch(error => this.setState({ error: true }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleSubmit = query => {
    this.setState({
      query,
      images: [],
      page: 1,
      randomId: generate(),
    });
  };

  openModal = image => {
    this.setState({ showModal: true, srcImage: image });
  };

  closeModal = () => {
    this.setState({ showModal: false, srcImage: null });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { showModal, images, loading, error, srcImage, showBtn } = this.state;
    return (
      <Container>
        <SearchBar onSubmit={this.handleSubmit} />
        {loading && <Loader />}
        {error && !loading && toast.error('Oops! Something went wrong!')}
        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {showBtn && <Button onClick={this.handleLoadMore} />}
        {showModal && (
          <GalleryModal
            isOpen={showModal}
            onRequestClose={this.closeModal}
            image={srcImage}
          />
        )}
        <GlobalStyle />
      </Container>
    );
  }
}
