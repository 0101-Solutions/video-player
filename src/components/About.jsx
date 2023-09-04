import Title from "./Title";
import image from "../assets/Images/trailer.jpg";
import { Link, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { useEffect, useState } from "react";

const About = () => {
  const [showMore, setShowMore] = useState(false);

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

  const handleLearnMoreClick = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="container">
      <section className="about" id="about">
        <Title
          subTitle="learn more about who we are and what we do"
          mainTitle="About us"
        />
        <div className="about__container">
          <div className="about__image">
            <img
              src={image}
              alt="photo depicting about us"
              className="about__image--img"
            />
          </div>
          <div className="about__text">
            <h4 className="about__text--title">
              Entry Level Driver Training (ELDT) is your gateway to a fulfilling career on the open road.
            </h4>
            <p className="about__text--description">
              Here we are dedicated to providing comprehensive ELDT programs that equip aspiring drivers with the skills and knowledge needed for success in the trucking industry. ELDT is designed to prepare you for a rewarding career, covering essential topics such as vehicle operation, safety regulations, and professional conduct.
              Our ELDT courses go beyond the basics, offering hands-on training, real-world simulations, and expert instruction. We understand that becoming a skilled truck driver is more than just passing a test its about mastering the art of safe and efficient driving.
              FMCSA-APPROVED CDL ENTRY LEVEL DRIVER TRAINING (ELDT) - CLASS A
              Individuals who obtain a commercial learner&apos;s permit (CLP) on or after February 7, 2022 will need to complete this course before they will be permitted to take their CDL skills Test. Upon completion of this course the results will be submitted to the FMCSA Training Provider Registry. Prior to providing any testing services CDL Testing centers will retrieve these results from the FMCSA Training Provider Registry to confirm that the student has completed this course.
            </p>
            {isAuthenticated ? (
              <Link to="/eldt-courses" className="about__cta">
                See Our Courses
              </Link>
            ) : (
              <>
                <button className="about__cta" onClick={handleLearnMoreClick}>Click Here To Learn More</button>
                {showMore && (
                  <>
                    <div className="learn-more mt-5 d-flex">
                      <div className="mr-5">
                        <ul className="ul-title">Basic Operation</ul>
                        <li>Orientation</li>
                        <li>Control Systems/Dashboard</li>
                        <li>Pre- and Post-Trip Inspections</li>
                        <li>Basic Control</li>
                        <li>Shifting/Operating Transmissions</li>
                        <li>Backing and Docking</li>
                        <li>Coupling and Uncoupling</li>
                      </div>
                      <div className="ml-5">
                        <ul className="ul-title">Safe Operating Procedures</ul>
                        <li>Visual Search</li>
                        <li>Communication</li>
                        <li>Distracted Driving</li>
                        <li>Speed Management</li>
                        <li>Space Management</li>
                        <li>Night Operation</li>
                        <li>Extreme Driving Conditions</li>
                      </div>
                    </div>
                    <div className="learn-more mt-5 d-flex">
                      <div className="mr-5">
                        <ul className="ul-title">Advanced Operating Practices</ul>
                        <li>Hazard Perception</li>
                        <li>Skid Control/Recovery, Jackknifing, and Other Emergencies</li>
                        <li>Railroad-Highway Grade Crossings</li>
                        <li>Vehicle Systems and Reporting Malfunctions</li>
                        <li>Identification and Diagnosis of Malfunctions</li>
                        <li>Roadside Inspections</li>
                        <li>Maintenance</li>
                      </div>
                      <div className="ml-5">
                        <ul className="ul-title">Non-Driving Activities</ul>
                        <li>Handling and Documenting Cargo</li>
                        <li>Environmental Compliance Issues</li>
                        <li>Hours of Service Requirements</li>
                        <li>Fatigue and Wellness Awareness</li>
                        <li>Post-Crash Procedures</li>
                        <li>External Communications</li>
                        <li>Whistleblower/Coercion</li>
                        <li>Trip Planning</li>
                        <li>Drugs/Alcohol</li>
                        <li>Medical Requirements</li>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

          </div>
        </div>
      </section>
    </div>
  );
};

export default About;