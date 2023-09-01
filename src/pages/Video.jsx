/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { showSuccessToast } from '../components/Toast';
import { selectCourseById, useCompleteCourseMutation, useGetMyCoursesQuery } from '../redux/features/course/courseApiSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VideoPlayerFn = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  // Fetch the course from the state
  const course = useSelector((state) => selectCourseById(state, id));

  const playerRef = useRef(null);

  const [completeCourse, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useCompleteCourseMutation();

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  useEffect(() => {
    const storedIndex = localStorage.getItem('activeVideoIndex');
    if (storedIndex !== null) {
      setActiveVideoIndex(parseInt(storedIndex));
    }
  }, []);

  const handleVideoClick = (index) => {
    setActiveVideoIndex(index);
  };


  const handleVideoEnded = () => {
    const nextIndex = activeVideoIndex + 1;

    if (nextIndex >= course.videos?.length) {
      // Redirect to the first video when reaching the end
      localStorage.removeItem('activeVideoIndex');
      showSuccessToast(`You have completed the course successfully`)
      // Send API to update student to graduatedStudents
      completeCourse(course.id)

      navigate("/dashboard/completed-course")

    } else {
      showSuccessToast(`Video ${course?.videos[activeVideoIndex].title} watched successfully`)
      course?.videos?.map((video) => {
        return { ...video, watched: true };
      });

      localStorage.setItem('activeVideoIndex', nextIndex);
      setActiveVideoIndex(nextIndex);
    }
  };

  return (
    <>
      <div className="container mb-5">
        <div className="main-video-container">
          <ReactPlayer
            url={course?.videos[activeVideoIndex].url}
            ref={playerRef}
            controls
            autoPlay
            width="auto"
            className="main-video"
            onEnded={handleVideoEnded}
          />
          <h3 className="main-vid-title">Currently Watching: {course?.videos[activeVideoIndex].title}</h3>
        </div>

        <div className="video-list-container">
          {course?.videos.map((video, index) => (
            <div
              key={index}
              className={`list ${activeVideoIndex === index ? 'active' : ''}`}
              onClick={() => handleVideoClick(index)}
            >
              <img src={course?.previewUrl} className="list-video" />
              <h3 className="list-title">{video?.title} {video?.watched ? '✔️ Watched' : ''}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoPlayerFn;
