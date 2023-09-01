import propTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link, redirect } from "react-router-dom";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { useEffect, useState } from "react";

const Hero = ({ subTitle, mainTitle, description }) => {
  const isLoggedIn = useSelector((state) => selectCurrentToken(state))

  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        <h2 className="hero-section__textbox--main-title">{mainTitle}</h2>
        <p className="hero-section__textbox--subtitle">{subTitle}</p>
        <p className="hero-section__textbox--description">{description}</p>

        <div className="content">
          {
            <div className="items-container">
              <div className="item">
                <h4 className="section-title">Who Needs ELDT?</h4>
                <p>
                  The Federal Motor Carrier Safety Association has made a
                  regulation that requires anyone who wants to obtain a CDL.
                  These requirements apply to you if you are looking to:
                </p>
                <ul className="list">
                  <li>Obtain a Class A or Class B CDL for the first time</li>
                  <li>Upgrade an existing Class B CDL to a Class A CDL</li>
                  <li>
                    Obtain a school bus (S), passenger (P), or hazardous
                    materials (H) endorsement for the first time
                  </li>
                </ul>
              </div>
              <div className="item">
                <h4 className="section-title">What Does ELDT Require?</h4>
                <p>
                  Entry-level drivers must receive training that allows them to
                  demonstrate proficiency in 1) theory training and 2)
                  behind-the-wheel (BTW) training while complying with training
                  provider requirements. Both portions of training must be
                  completed within one year of each other.
                </p>
              </div>
              <div className="item">
                <h4 className="section-title">Theory Training</h4>
                <p>
                  Training includes lectures, demonstrations, and online
                  learning. Trainees must score at least 86% on their
                  assessments with topics including:
                </p>
                <ul className="list">
                  <li>Basic Operation</li>
                  <li>Safe Operating Procedures</li>
                  <li>Advanced Operation Procedures</li>
                  <li>Vehicle Systems and Reporting Malfunctions</li>
                  <li>Non-driving activities</li>
                </ul>
              </div>
              <div className="item">
                <h4 className="section-title">Behind-the-Wheel Training</h4>
                <p>
                  While theory training may include a stimulator, BTW training
                  may not use a simulator to meet requirements. Behind-the-wheel
                  training includes:
                </p>
                <ul className="list">
                  <li>Actual operation of a CMV</li>
                  <li>Takes place on a range or a public road</li>
                  <li>
                    No minimum number of hours, training provider will determine
                    the driver&apos;s proficiency
                  </li>
                  <li>
                    Basic vehicle control skills and mastery of basic maneuvers
                  </li>
                </ul>
              </div>
              <div className="item">
                <h4 className="section-title">
                  Training Provider Requirements
                </h4>
                <p style={{ "padding": "20px" }}>
                  Entry-level driver training–both theory and BTW training–must
                  be completed with a registered training provider. As a
                  registered training provider, Truck Drivers Institute meets
                  and exceeds ELDT regulations. TDI makes it easy for you by
                  handling driver training certification, allowing you to skip
                  the search for a trainer provider.
                </p>
              </div>
            </div>
          }
        </div>
        {!isAuthenticated ? (
          <Link to="/register" className="hero-section__textbox--link">
            register
          </Link>
        ) : (
          <Link to="/eldt-courses" className="hero-section__textbox--link">
            See Our Courses
          </Link>
        )}
      </div>
    </section>
  );
};

Hero.propTypes = {
  subTitle: propTypes.string.isRequired,
  mainTitle: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
}

export default Hero;
