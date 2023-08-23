import { useRef } from 'react'
import axios from 'axios';
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux';

import Header from '../components/Header';
import CourseDetails from '../redux/features/course/CourseDetails';
import { selectCurrentToken } from '../redux/features/auth/authSlice';

const url = "http://localhost:3080/api/v1"

const VideoPlayer = () => {
  const isLoggedIn = useSelector((state) => selectCurrentToken(state));


  const playerRef = useRef(null);

  // Create a function that sends some json to video-progress endpoint
  const handleOnStart = () => {
    console.log("video is playing")
  }

  const handleOnSeek = () => {
    playerRef.current?.seekTo(1, 'seconds');
  }

  const handleOnEnded = () => {

    axios.post(`${url}/video-progress`, {
      isLoggedIn,
    });
  }

  return (
    <>
      <Header />
      <div className='player-wrapper'>
        <ReactPlayer
          ref={playerRef}
          className='react-player'
          controls={true}
          url='https://vimeo.com/446818432'
          width='100%'
          height='100%'
          onStart={handleOnStart}
          onSeek={handleOnSeek}
          onEnded={handleOnEnded}
        />
      </div>
      <br />
      <CourseDetails />
    </>
  )
}

export default VideoPlayer