import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

// import { store } from '../../store';

const Prefetch = () => {
  useEffect(() => {
    // Manually subscribing to the endpoints
    // const circulars = store.dispatch(circularApiSlice.endpoints.getCirculars.initiate())


    return () => {
      // Manually unsubscribing from the endpoints. Clean up
      // circlars.unsubscribe()
    }
  }, [])

  return <Outlet />
}
export default Prefetch