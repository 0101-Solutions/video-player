import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

import { store } from "../../redux/store"

import { selectAllCourses } from "../../redux/features/course/courseApiSlice";
import { selectAllUsers } from "../../redux/features/users/usersApiSlice";
import { selectAllOrders } from "../../redux/features/order/ordersApiSlice";


const AdminHomePage = () => {
  // console.log(selectAllOrders(store.getState()))
  const courses = useSelector(state => selectAllCourses(state, store.getState()));
  const users = useSelector(state => selectAllUsers(state, store.getState()));
  const orders = useSelector(state => selectAllOrders(state, store.getState()));

  let content;

  content = (
    <>
      <Helmet>
        <title>CDL City Driving School Admin Page</title>
        <meta name="description" content="Login - CDL City Driving School App" />
        <meta name="keyword" content="CDL City Driving School" />
        <meta property="og:title" content="CDL City Driving School App" />
        <link rel="canonical" href="https://www.eldttrucking.com/dashboard/admin" />
      </Helmet>
      <div className="items-container mb-5">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Admin Dashboard</h1>
          </div>
        </div>
      </div>
      <div className="card-admin">
        <div className="row text-center">
          <div className="col-md-4 mb-3 mt-2">
            <div className="card">
              <div className="card-body">
                <br />
                <h1 className="card-title" style={{ "fontSize": "4rem" }}>Our Courses</h1>
                <p className="card-text">Total Courses: ({courses.length})</p>
                <Link to="/dashboard/admin/courses" className="btn btn-primary"><h2>View Our Courses</h2></Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3 mt-2">
            <div className="card">
              <div className="card-body">
                <br />
                <h1 className="card-title" style={{ "fontSize": "4rem" }}>Our Users</h1>
                <p className="card-text">Total Users: ({users.length})</p>
                <Link to="/dashboard/admin/users" className="btn btn-primary"><h2>View Our Users</h2></Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3 mt-2">
            <div className="card">
              <div className="card-body">
                <br />
                <h1 className="card-title" style={{ "fontSize": "4rem" }}>Our Orders</h1>
                <p className="card-text">Total Orders: ({orders.length})</p>
                <Link to="/dashboard/admin/orders" className="btn btn-primary"><h2>View Our Orders</h2></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )


  return content;
}

export default AdminHomePage