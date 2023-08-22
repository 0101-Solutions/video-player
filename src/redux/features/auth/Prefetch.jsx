import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { coursesApiSlice } from '../course/courseApiSlice';

import { store } from '../../store';

const Prefetch = () => {
  useEffect(() => {
    // Manually subscribing to the endpoints
    const courses = store.dispatch(coursesApiSlice.endpoints.getCourses.initiate());


    return () => {
      // Manually unsubscribing from the endpoints. Clean up
      courses.unsubscribe();
    }
  }, [])

  return <Outlet />
}
export default Prefetch