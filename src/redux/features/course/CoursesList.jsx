import { useGetCoursesQuery } from "../../features/course/courseApiSlice";

import Loader from '../../../components/Loader';
import { ToastNotification, showErrorToast } from '../../../components/Toast';
import Course from './Course';
import Title from "../../../components/Title";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
// import { useGetMyOrdersQuery } from "../order/orderApiSlice";

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
        <Header />
        <section className="courses" id="courses">
          <Title
            subTitle="we have a variety of courses to make you drive your dream car"
            mainTitle="browse our courses"
          />
          {ids.map((id) => (<Course key={id} courseId={id} />))}
        </section>
        <Footer />
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