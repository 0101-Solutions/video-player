import { useGetCoursesQuery } from "../../features/course/courseApiSlice";

import Loader from '../../../components/Loader';
import { showErrorToast } from '../../../components/Toast';
import Course from './Course';
import Title from "../../../components/Title";

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
          <Title
            mainTitle="ELDT Courses"
          />
          {ids.map((id) => <Course key={id} courseId={id} />)}
        </section>
      </>
    );
  }

  if (isError) {
    content = (
      <>
        {showErrorToast(error.message)}
      </>
    )
  }

  return content;
}

export default CoursesList