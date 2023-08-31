import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/Loader";
import { showErrorToast } from "../../../../components/Toast";
import { useGetCoursesQuery } from "../courseApiSlice";
import AdminCourse from "./AdminCourse";


const AdminCourseList = () => {
  const navigate = useNavigate();

  const {
    data: courses,
    isLoading,
    isError,
    isSuccess,
    error
  } = useGetCoursesQuery();

  let content;

  if (isLoading) {
    content = <Loader />
  }

  if (isError) {
    content = showErrorToast(error.message)
  }

  if (isSuccess) {
    const { ids } = courses;

    const courseContent = ids?.length ? ids.map(courseId => (
      <AdminCourse courseId={courseId} key={courseId} />
    )) : (
      <div className="course-item">
        <div className="item-data">No Course Found</div>
      </div>
    );

    content = (
      <div className="course-list container">
        <h4 className="course-section__textbox--main-title edit">Courses On Our Platform</h4>
        {courseContent}
        <div className="text-center mb-5">
          <button className="new-course__actions--button" onClick={() => navigate(`/dashboard/admin/new-course`)}>Create New Course</button>
        </div>
      </div >
    );
  }

  return content;
}

export default AdminCourseList