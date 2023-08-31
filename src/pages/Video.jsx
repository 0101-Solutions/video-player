/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { showSuccessToast } from '../components/Toast';
import { useCompleteCourseMutation, useGetMyCoursesQuery } from '../redux/features/course/courseApiSlice';
import Header from '../components/Header';

const VideoPlayerFn = () => {
  const playerRef = useRef(null);

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

  // Map through the courses.data object and get the videos from the array.data in an array
  function getVideoUrls(courses) {
    const videos = courses?.data?.map((course) => course).map((video) => video.course.videos);

    return videos
  }

  const previewUrl = courses?.data?.map((course) => course).map((video) => video.course.previewUrl);

  const videos = getVideoUrls(courses).flat();

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

    if (nextIndex >= videos.length) {
      // Redirect to the first video when reaching the end
      localStorage.removeItem('activeVideoIndex');
      showSuccessToast(`You have completed the course successfully`)
      // Send API to update student to graduatedStudents 

      window.location.reload();
    } else {
      videos.map((video) => {
        showSuccessToast(`Video ${video.title} watched successfully`)

        return { ...video, watched: true };
      });

      localStorage.setItem('activeVideoIndex', nextIndex);
      setActiveVideoIndex(nextIndex);
    }
  };

  return (
    <>
      <div className="container">
        <div className="main-video-container">
          <ReactPlayer
            url={videos[activeVideoIndex].url}
            ref={playerRef}
            controls
            autoPlay
            width="auto"
            className="main-video"
            onEnded={handleVideoEnded}
          />
          <h3 className="main-vid-title">Currently Watching: {videos[activeVideoIndex].title}</h3>
        </div>

        <div className="video-list-container">
          {videos.map((video, index) => (
            <div
              key={index}
              className={`list ${activeVideoIndex === index ? 'active' : ''}`}
              onClick={() => handleVideoClick(index)}
            >
              <img src={previewUrl} className="list-video" />
              <h3 className="list-title">{video.title} {video.watched ? '✔️ Watched' : ''}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoPlayerFn;
