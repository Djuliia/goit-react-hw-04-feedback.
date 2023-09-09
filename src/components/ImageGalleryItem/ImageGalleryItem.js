import { GalleryImg, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, openModal }) => {
  return (
    <GalleryItem key={image.id} onClick={() => openModal(image)}>
      <GalleryImg src={image.webformatURL} alt={image.tags} />
    </GalleryItem>
  );
};
