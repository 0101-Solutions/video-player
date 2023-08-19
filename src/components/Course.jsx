import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import PropTypes from "prop-types";

const buildArr = (num) => {
  num = Math.floor(num);
  const result = [];
  if (num <= 0) {
    for (let i = 0; i <= 4; i++) {
      result.push("half-star");
    }
  } else if (num >= 5) {
    for (let i = 0; i <= 4; i++) {
      result.push("star");
    }
  } else {
    for (let i = 0; i < num; i++) {
      result.push("star");
    }
    const remainder = 5 - num;
    for (let i = 0; i < remainder; i++) {
      result.push("half-star");
    }
  }
  return result;
};

const Course = ({
  img,
  title,
  description,
  instructorName,
  numRatings,
  numStudents,
  numHours,
  numLectures,
  level,
  price,
}) => {
  const stars = buildArr(numRatings);

  return (
    <div className="course">
      <div className="course__image">
        <img src={img} alt="course image" className="course__image--img" />
      </div>
      <div className="course__details">
        <p className="course__details--title">{title}</p>
        <p className="course__details--description">{description}</p>
        <p className="course__details--instructor">{instructorName}</p>
        <div className="course__details--ratings">
          <p className="course__details--number-of-ratings">{numRatings}</p>
          <span className="stars__container">
            {stars.map((star, i) =>
              star === "star" ? (
                <AiFillStar key={i} />
              ) : (
                <AiOutlineStar key={i} />
              )
            )}
          </span>
          <p>({numStudents})</p>
        </div>

        <div className="course__timing">
          <p className="course__timing-element course__timing--hours">
            {numHours} total hours
          </p>
          <p className="course__timing-element course__timing-element-divider course__timing--lectures">
            {numLectures} lectures
          </p>
          <p className="course__timing-element course__timing-element-divider course__timing--level">
            {level}
          </p>
        </div>
        <div className="course__actions">
          <button className="course__actions--button">add to cart</button>
          <button className="course__actions--button">buy now</button>
        </div>
      </div>
      <p className="course__price">
        <span className="symbol">$</span>
        <span className="price">{price}</span>
      </p>
    </div>
  );
};

Course.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  instructorName: PropTypes.string.isRequired,
  numRatings: PropTypes.number.isRequired,
  numStudents: PropTypes.number.isRequired,
  numHours: PropTypes.number.isRequired,
  numLectures: PropTypes.number.isRequired,
  level: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}

export default Course;