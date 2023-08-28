import { useRef } from 'react'
import ReactPlayer from 'react-player'
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';

import Header from '../components/Header';
import CourseDetails from '../redux/features/course/CourseDetails';
import { useCompleteCourseMutation, useGetMyCoursesQuery } from '../redux/features/course/courseApiSlice';
import Loader from '../components/Loader';
import { ToastNotification, showErrorToast, showSuccessToast } from "../components/Toast";

const VideoPlayer = () => {
  const {
    data: courses,
    isLoading: isLoadingCourses,
    isSuccess: isSuccessCourses,
    isError: isErrorCourses,
    error: errorCourses
  } = useGetMyCoursesQuery();

  const [completeCourse, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useCompleteCourseMutation();

  // Map through the courses and get the course from the array.data
  const courseObj = courses?.data?.map((course) => course);

  const playerRef = useRef(null);

  const handleOnEnded = () => {
    showSuccessToast("Congratulations! You have completed this course.");
    completeCourse();
    // navigate("/certificate");
  };

  let content;

  if (isLoading || isLoadingCourses) {
    content = <Loader />
  }

  if (isSuccessCourses || isSuccess) {
    content = (
      <>
        <Header />

        {(isError || isErrorCourses) && showErrorToast(error?.message) || showErrorToast(errorCourses?.message)}

        {/* Map through each course */}
        {courseObj?.map((course) =>
        (
          <>
            <div className='player-wrapper' key={course?.course?._id}>
              <ReactPlayer
                key={course?.course?._id}
                ref={playerRef}
                className='react-player'
                controls={true}
                url={course?.course?.videoUrl}
                width='100%'
                height='80%'
                onEnded={handleOnEnded}
              />
            </div>
            <br />
            <CourseDetails name={course?.course?.name} description={course?.course?.description} img={course?.course?.previewUrl} />
          </>
        ))}
        <ToastNotification />
      </>
    )
  } else {
    <>
      <Header />
      {(isError || isErrorCourses) && showErrorToast(error?.message) || showErrorToast(errorCourses?.message)}
      <div className='player-wrapper'>
        <p>The course you are looking for does not exist please try again later.</p>
        <ToastNotification />
      </div>
    </>
  }

  return content;
}

export default VideoPlayer