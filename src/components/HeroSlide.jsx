import { Link } from "react-router-dom";
import img from "../assets/Images/img-3.jpg";
import img2 from "../assets/Images/img-2.jpg";
import img3 from "../assets/Images/img-1.jpg";
import PropTypes from "prop-types";

const HeroSlide = ({ subTitle, mainTitle, description }) => {
  return (
    <section className="hero-section">
      <div className="hero-section__textbox">
        <p className="hero-section__textbox--subtitle">{subTitle}</p>
        <h2 className="hero-section__textbox--main-title">{mainTitle}</h2>
        <p className="hero-section__textbox--description">{description}</p>
        {/* <Link to="/">register</Link> */}
        <Link to="/signup" className="hero-section__textbox--link">
          register
        </Link>
      </div>
      <div className="hero__images">
        <img
          src={img3}
          alt="image"
          className="hero__image--img rot-1 hero-img-abs"
        />
        <img src={img2} alt="image" className="hero__image--img rot-2" />
        <img
          src={img}
          alt="image"
          className="hero__image--img rot-3 hero-img-abs"
        />
      </div>
    </section>
  );
};

HeroSlide.propTypes = {
  subTitle: PropTypes.string.isRequired,
  mainTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default HeroSlide;