import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addToCart } from "../../features/cart/cartSlice";

import { selectCourseById } from "../../features/course/courseApiSlice";

import { useGetMyOrdersQuery } from "../order/ordersApiSlice";

// eslint-disable-next-line react/prop-types
const Course = ({ courseId }) => {

  const { data: orders } = useGetMyOrdersQuery();

  const getCourseIds = orders => {
    if (!orders?.data) {
      return [];
    }

    const courseIds = [];

    for (const order of orders.data) {
      if (order.courses) {
        for (const course of order.courses) {
          if (course.course && course.course._id) {
            courseIds.push(course.course._id);
          }
        }
      }
    }
    return courseIds;
  }

  const courseIds = getCourseIds(orders);

  const course = useSelector(state => selectCourseById(state, courseId));

  // Filter courses where it should return filteredCourses
  const filteredCourseIds = courseIds?.filter(id => id === courseId);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleAddToCart = (course) => {
    dispatch(addToCart(course));
    navigate("/cart");
  };

  if (course) {
    return (
      <>
        <div className="course">
          <div className="course__image">
            <img src={course.previewUrl} alt="course image" className="course__image--img" />
          </div>
          <div className="course__details">
            <p className="course__details--title">{course.name}</p>
            <p className="course__details--description">{course.description}</p>
            <div className="course__details--ratings">
              <p>{course.students?.length} Graduated Students</p>
            </div>

            <div className="course__timing">
              <p className="course__timing-element course__timing--hours">
                {course.duration} total hours
              </p>
              <p className="course__timing-element course__timing-element-divider course__timing--lectures">
                {course.videos.length} lectures
              </p>
              <p className="course__timing-element course__timing-element-divider course__timing--level">
                {course.category}
              </p>
            </div>
            <div className="course__actions">
              {filteredCourseIds == null || Object.keys(filteredCourseIds)?.length === 0 ? (
                <>
                  <button className="course__actions--button" onClick={() => handleAddToCart(course)}>Add to cart</button>
                  <button className="course__actions--button" onClick={() => navigate("/cart")}>Check Cart</button>
                </>
              ) : (
                <button className="course__actions--button" onClick={() => navigate("/dashboard/video-courses")}>Watch Now</button>
              )}
            </div>
          </div>
          <p className="course__price">
            <span className="course-symbol">$</span>
            <span className="course-price">{course.price}</span>
          </p>
        </div>

      </>
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