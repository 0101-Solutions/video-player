import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { coursesApiSlice } from '../course/courseApiSlice';
import { ordersApiSlice } from '../order/ordersApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';

import { store } from '../../store';
import useAuth from '../../../hooks/useAuth';
import { schoolsApiSlice } from '../school/schoolApiSlice';

const Prefetch = () => {
  const { isAdmin } = useAuth();

  useEffect(() => {
    // Manually subscribing to the endpoints
    const courses = store.dispatch(coursesApiSlice.endpoints.getCourses.initiate());
    const myOrders = store.dispatch(ordersApiSlice.endpoints.getMyOrders.initiate());
    const orders = store.dispatch(ordersApiSlice.endpoints.getOrders.initiate())
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
    const schoolInfo = store.dispatch(schoolsApiSlice.endpoints.getSchools.initiate())

    return () => {
      // Manually unsubscribing from the endpoints. Clean up
      courses.unsubscribe();
      myOrders.unsubscribe();
      orders.unsubscribe();
      users.unsubscribe();
      schoolInfo.unsubscribe();
    }
  }, [isAdmin])

  return <Outlet />
}
export default Prefetch