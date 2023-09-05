import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate, redirect } from "react-router-dom"

import Homepage from './pages/Homepage'
import PageNotFound from './components/404Page'
import Login from './redux/features/auth/Login'
import Register from './redux/features/auth/Register'
import ForgotPassword from './redux/features/auth/ForgotPassword'
// import SetNewPassword from './redux/features/auth/SetNewPassword'
import Prefetch from './redux/features/auth/Prefetch'
// import EmailVerification from './redux/features/auth/EmailVerfication'
import Cart from './redux/features/cart/Cart'
import PaymentSuccessfulPage from './pages/PaymentSuccessfulPage'
import Layout from './components/Layout'
import PersistLogin from './redux/features/auth/PersistLogin'
import RequireAuth from './redux/features/auth/RequireAuth'

import { selectCurrentToken } from './redux/features/auth/authSlice'
import CoursesList from './redux/features/course/CoursesList'
import VideoPlayerFn from './pages/Video'
import useAuth from './hooks/useAuth'
import AdminHomePage from './pages/admin/AdminHomePage'
import Header from './components/Header'
import Footer from './components/Footer'
import NewCourseForm from './redux/features/course/admin/NewCourseForm'
import AdminCourseList from './redux/features/course/admin/AdminCourseList'
import EditCourse from './redux/features/course/admin/EditCourse'
import AdminHeader from './components/admin/AdminHeader'
import EditUser from './redux/features/users/EditUser'
import UsersList from './redux/features/users/UserList'
import NewUserForm from './redux/features/users/NewUserForm'
import OrdersList from './redux/features/order/OrdersList'
import NewOrderForm from './redux/features/order/NewOrderForm'
import EditOrder from './redux/features/order/EditOrder'
import CompleteCoursePage from './pages/CompleteCoursePage'
import About from './components/About'
import SetNewPassword from './redux/features/auth/SetNewPassword'
import VerifyEmail from './pages/VerifyEmail'
import ActivateAccount from './pages/ActivateAccount'

function App() {
  const { isAdmin, status } = useAuth();

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const isLoggedIn = useSelector((state) => selectCurrentToken(state))

  useEffect(() => {
    if (isLoggedIn) {
      setIsAuthenticated(true)
      if (status === "inactive") {
        setIsActive(false)
      } else if (status === "active") {
        setIsActive(true)
      }
    }

    if (!isLoggedIn) {
      redirect('/login')
      setIsAuthenticated(false)
    }
  }, [isLoggedIn, status]);

  return (
    <>
      {isAuthenticated && !isAdmin ? <Header /> : null}
      {isAuthenticated && isAdmin ? <AdminHeader /> : <></>}
      {!isAuthenticated ? <Header /> : null}

      <div id="wrapper" className='wrapper bg-ash'>
        <Routes>
          <Route element={<Prefetch />}>

            <Route path="/" element={<Layout />}>

              {!isAuthenticated
                ? <Route path="/" element={<Homepage />} />
                : <Route path="/" element={<Navigate replace to="/dashboard" />} />
              }

              <Route path="/eldt-courses" element={<CoursesList />} />

              <Route path="/about" element={<About />} />

              <Route path="/set-new-password/:token" element={<SetNewPassword />} />

              <Route path="/verify-email/:token" element={<VerifyEmail />} />

              {!isAuthenticated
                ? <Route path="/login" element={<Login />} />
                : <Route path="/" element={<Navigate replace to="/dashboard" />} />
              }

              {!isAuthenticated
                ? <Route path="/login" element={<Login />} />
                : <Route path="/login" element={<Navigate replace to="/dashboard" />} />
              }

              {!isAuthenticated
                ? <Route path="/forgot-password" element={<ForgotPassword />} />
                : <Route path="/forgot-password" element={<Navigate replace to="/dashboard" />} />
              }

              {!isAuthenticated
                ? <Route path="/signup" element={<Register />} />
                : <Route path="/signup" element={<Navigate replace to="/dashboard" />} />
              }

              {status === "inactive" && isAuthenticated ? (
                <Route path="/activate-account" element={<ActivateAccount />} />
              ) : (
                <></>
              )}

              <Route element={<PersistLogin />}>

                <Route element={<RequireAuth />}>

                  {/* User Routes */}
                  {isActive
                    ? <Route path="/dashboard" element={<Homepage />} />
                    : <Route path="/dashboard" element={<Navigate replace to="/activate-account" />} />
                  }

                  {isActive
                    ? <Route path="/dashboard/eldt-courses" element={<CoursesList />} />
                    : <Route path="/dashboard/eldt-courses" element={<Navigate replace to="/activate-account" />} />
                  }

                  {isActive
                    ? <Route path="/video-courses" element={<VideoPlayerFn />} />
                    : <Route path="/video-courses" element={<Navigate replace to="/activate-account" />} />
                  }

                  {isActive
                    ? <Route path="/cart" element={<Cart />} />
                    : <Route path="/cart" element={<Navigate replace to="/activate-account" />} />
                  }

                  {isActive
                    ? <Route path="/checkout/success" element={<PaymentSuccessfulPage />} />
                    : <Route path="/checkout/success" element={<Navigate replace to="/activate-account" />} />
                  }

                  {isActive
                    ? <Route path="/dashboard/video-courses/:id" element={<VideoPlayerFn />} />
                    : <Route path="/dashboard/video-courses/:id" element={<Navigate replace to="/activate-account" />} />
                  }

                  {isActive
                    ? <Route path="/dashboard/completed-course" element={<CompleteCoursePage />} />
                    : <Route path="/dashboard/completed-course" element={<Navigate replace to="/activate-account" />} />
                  }

                  <Route path="*" element={<PageNotFound />} />

                  {/* Admin Routes */}
                  {isAdmin && isActive && <Route path="/dashboard/admin">
                    {<Route index element={<AdminHomePage />} />}

                    {<Route path="new-course" element={<NewCourseForm />} />}

                    {<Route path="courses" element={<AdminCourseList />} />}

                    {<Route path="edit-course/:id" element={<EditCourse />} />}

                    {<Route path="users" element={<UsersList />} />}

                    {<Route path="new-user" element={<NewUserForm />} />}

                    {<Route path="edit-user/:id" element={<EditUser />} />}

                    {<Route path="orders" element={<OrdersList />} />}

                    {<Route path="new-order" element={<NewOrderForm />} />}

                    {<Route path="edit-order/:id" element={<EditOrder />} />}

                    {<Route path="*" element={<PageNotFound />} />}
                  </Route>}

                </Route>
              </Route>

            </Route>

          </Route>

          <Route path="*" element={<PageNotFound />} />

        </Routes>

      </div >
      <Footer />
    </>
  )
}

export default App
