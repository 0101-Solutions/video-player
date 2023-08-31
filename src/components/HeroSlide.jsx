import { Link, redirect } from "react-router-dom";
import img from "../assets/Images/img-3.jpg";
import img2 from "../assets/Images/img-2.jpg";
import img3 from "../assets/Images/img-1.jpg";
import PropTypes from "prop-types";
import { useState } from "react";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const HeroSlide = ({ subTitle, mainTitle, description }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const isLoggedIn = useSelector((state) => selectCurrentToken(state))

  useEffect(() => {
    if (isLoggedIn) {
      setIsAuthenticated(true)
    }

    if (!isLoggedIn) {
      redirect('/login')
      setIsAuthenticated(false)
    }
  }, [isLoggedIn]);

  return (
    <section className="hero-section">
      <div className="hero-section__textbox">
        <p className="hero-section__textbox--subtitle">{subTitle}</p>
        <h2 className="hero-section__textbox--main-title">{mainTitle}</h2>
        <p className="hero-section__textbox--description">{description}</p>
        {/* <Link to="/">register</Link> */}
        {!isAuthenticated
          ? <Link to="/register" className="hero-section__textbox--link">register</Link>
          : <Link to="/video-courses" className="hero-section__textbox--link">View Courses</Link>
        }

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