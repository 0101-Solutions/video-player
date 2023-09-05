import propTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
// import Slider from 'react-slick';

const CarouselComponent = ({ images }) => {
  return (
    <div className="text-center container carousel-container img-fluid">
      <Carousel controls={false} key={images}>
        <Carousel.Item>
          <img className="d-block w-100" src={images[0]} alt="ELDT Trucking Banner" />

        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={images[1]} alt="ELDT Trucking Banner" />

        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={images[2]} alt="ELDT Trucking Banner" />

        </Carousel.Item>
      </Carousel>
    </div>
  );
};

CarouselComponent.propTypes = {
  images: propTypes.arrayOf(propTypes.string).isRequired,
};

export default CarouselComponent;