import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCourseById } from '../courseApiSlice';

const AdminCourse = ({ courseId }) => {
  const navigate = useNavigate();

  const course = useSelector((state) => selectCourseById(state, courseId));

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
            <p>{course.students.length} Enrolled Student(s)</p>
          </div>
          <div className="course__timing">
            <p className="course__timing-element course__timing--hours">
              {course.duration} Total Hours
            </p>
            <p className="course__timing-element course__timing-element-divider course__timing--lectures">
              {course.videos.length} Videos
            </p>
            <p className="course__timing-element course__timing-element-divider course__timing--level">
              {course.category}
            </p>
          </div>
          <div className="course__actions">
            <button className="course__actions--button" onClick={() => navigate(`/dashboard/admin/edit-course/${courseId}`)}>Edit Course</button>
          </div>
        </div>
        <p className="course__price">
          <span className="course-symbol">$</span>
          <span className="course-price">{course.price}</span>
        </p>
      </div>

    </>
  )
}

AdminCourse.propTypes = {
  courseId: propTypes.string.isRequired,
}

export default AdminCourse