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
import VideoPlayer from './pages/VideoPlayerPage'
import PaymentSuccessfulPage from './pages/PaymentSuccessfulPage'
import Layout from './components/Layout'
import PersistLogin from './redux/features/auth/PersistLogin'
import RequireAuth from './redux/features/auth/RequireAuth'

import { selectCurrentToken } from './redux/features/auth/authSlice'
import CoursesList from './redux/features/course/CoursesList'
import CookieConsentComponent from './components/CookieConsent'


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const isLoggedIn = useSelector((state) => selectCurrentToken(state))

  useEffect(() => {
    if (isLoggedIn) {
      setIsAuthenticated(true)
    }

    if (!isLoggedIn) {
      redirect('/login')
      setIsAuthenticated(false)
    }
  }, [isLoggedIn]);

  return (
    <>
      <CookieConsentComponent />
      <div id="wrapper" className='wrapper bg-ash'>
        <Routes>
          <Route element={<Prefetch />}>

            <Route path="/" element={<Layout />}>

              <Route index element={<Homepage />} />

              <Route path="/eldt-courses" element={<CoursesList />} />

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

              <Route element={<PersistLogin />}>

                <Route element={<RequireAuth />}>

                  <Route path="/dashboard" element={<Homepage />} />

                  <Route path="/dashboard/eldt-courses" element={<CoursesList />} />

                  <Route path="/cart" element={<Cart />} />

                  <Route path="/checkout/success" element={<PaymentSuccessfulPage />} />

                  <Route path="/dashboard/video-courses" element={<VideoPlayer />} />

                  <Route path="*" element={<RequireAuth />} />

                </Route>

              </Route>

            </Route>


          </Route>

          <Route path="*" element={<PageNotFound message={"Page not found"} />} />

        </Routes>

      </div >
    </>
  )
}

export default App
