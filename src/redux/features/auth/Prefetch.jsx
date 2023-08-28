import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { coursesApiSlice } from '../course/courseApiSlice';

import { store } from '../../store';

const Prefetch = () => {
  useEffect(() => {
    // Manually subscribing to the endpoints
    const courses = store.dispatch(coursesApiSlice.endpoints.getCourses.initiate());
    const myOrders = store.dispatch(coursesApiSlice.endpoints.getMyCourses.initiate());


    return () => {
      // Manually unsubscribing from the endpoints. Clean up
      courses.unsubscribe();
      myOrders.unsubscribe();
    }
  }, [])

  return <Outlet />
}
export default Prefetch