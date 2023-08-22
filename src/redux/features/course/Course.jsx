import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addToCart } from "../../features/cart/cartSlice";

import { selectCourseById } from "../../features/course/courseApiSlice";

// eslint-disable-next-line react/prop-types
const Course = ({ courseId }) => {

  const course = useSelector(state => selectCourseById(state, courseId));

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleAddToCart = (course) => {
    dispatch(addToCart(course));
    navigate("/cart");
  };

  if (course) {
    return (
      <div className="course">
        <div className="course__image">
          <img src={course.previewUrl} alt="course image" className="course__image--img" />
        </div>
        <div className="course__details">
          <p className="course__details--title">{course.name}</p>
          <p className="course__details--description">{course.description}</p>
          <div className="course__timing">
            <p className="course__timing-element course__timing--hours">
              {course.duration} total hours
            </p>
            <p className="course__timing-element course__timing-element-divider course__timing--level">
              {course.category}
            </p>
          </div>
          <div className="course__actions">
            <button className="course__actions--button" onClick={() => handleAddToCart(course)}>Add to cart</button>
            <button className="course__actions--button" onClick={() => navigate("/cart")}>Check Cart</button>
          </div>
        </div>
        <p className="course__price">
          <span className="symbol">$</span>
          <span className="price">{course.price}</span>
        </p>
      </div>
    )
  } else {
    return (
      <div className="course">
        <p>Sorry the course is missing </p>
      </div>
    )
  }
}

export default Course