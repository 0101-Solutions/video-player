import propTypes from "prop-types";
import Title from "../../../components/Title";
// import image from "../../../assets/Images/trailer.jpg";

const CourseDetails = ({ name, description, img }) => {
  return (
    <section className="about" id="about">
      <Title
        subTitle="learn more about what the course expects from you."
        mainTitle={name}
      />
      <div className="about__container">
        <div className="about__image">
          <img
            src={img}
            alt="photo depicting about us"
            className="about__image--img"
          />
        </div>
        <div className="about__text">

          <p className="about__text--description">
            {description}
          </p>
        </div>
      </div>
      <br />
    </section>
  );
};

CourseDetails.propTypes = {
  name: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
};

export default CourseDetails;