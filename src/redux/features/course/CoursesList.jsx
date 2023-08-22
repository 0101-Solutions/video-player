import { useGetCoursesQuery } from "../../features/course/courseApiSlice";

import Loader from '../../../components/Loader';
import { ToastNotification, showErrorToast } from '../../../components/Toast';
import Course from './Course';

const CoursesList = () => {

  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCoursesQuery();

  let content;

  if (isLoading) {
    content = <Loader />
  }

  if (isSuccess) {
    const { ids } = courses;

    content = (
      <>
        <section className="courses" id="courses">
          {ids.map((id) => (<Course key={id} courseId={id} />))}
        </section>
      </>
    );
  }

  if (isError) {
    content = (
      <>
        {showErrorToast(error.message)}
        <ToastNotification />
      </>
    )
  }

  return content;
}

export default CoursesList