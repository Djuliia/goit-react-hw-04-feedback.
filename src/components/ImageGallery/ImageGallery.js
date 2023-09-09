import { GalleryList } from "./ImageGallery.styled";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({ images, openModal }) => {
    return (
      <GalleryList>
        {images.map(image => {
          return (
            <ImageGalleryItem
           image={image}
            openModal={openModal}
            key={image.id}
          />
          )
        }
        )}
      </GalleryList>
    );
        }