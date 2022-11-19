import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const slideImages = [];

const Slideshow = ({ images }) => {
  images.fields.bilder.length &&
    images.fields.bilder.map((image) => {
      slideImages.push({
        url: image.fields.file.url,
        caption: image.fields.title,
      });
    });
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div className="each-slide-effect" key={index}>
            <div style={{ backgroundImage: `url(${slideImage.url})` }}>
              <span>{slideImage.caption}</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
