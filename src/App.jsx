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
      <div id="wrapper" className='wrapper bg-ash'>
        <Routes>

          <Route path="/*" element={<Layout />}>

            <Route index element={<Homepage />} />

            {!isAuthenticated
              ? <Route index element={<Login />} />
              : <Route path="/" element={<Navigate replace to="/" />} />
            }

            {!isAuthenticated
              ? <Route path="login" element={<Login />} />
              : <Route path="login" element={<Navigate replace to="/" />} />
            }

            {!isAuthenticated
              ? <Route path="forgot-password" element={<ForgotPassword />} />
              : <Route path="forgot-password" element={<Navigate replace to="/" />} />
            }

            {!isAuthenticated
              ? <Route path="signup" element={<Register />} />
              : <Route path="/" element={<Navigate replace to="/" />} />
            }

            <Route element={<PersistLogin />}>

              {/* Admin Dashboard Routes */}
              <Route element={<Prefetch />}>

                <Route element={<RequireAuth />}>

                  <Route path="cart" element={<Cart />} />

                  <Route path="checkout/success" element={<PaymentSuccessfulPage />} />

                  <Route path="video-courses" element={<VideoPlayer />} />

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
