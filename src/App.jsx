import { useState, useEffect } from 'react'

import { Route, Routes, redirect } from "react-router-dom"

// import { Routes, Route, Navigate, redirect } from "react-router-dom"
import { useSelector } from 'react-redux'

// import useAuth from './hooks/useAuth'
import { selectCurrentToken } from './redux/features/auth/authSlice'

import Homepage from './pages/Homepage'
import Login from './redux/features/auth/Login'
import Register from './redux/features/auth/Register'
import ForgotPassword from './redux/features/auth/ForgotPassword'
import SetNewPassword from './redux/features/auth/SetNewPassword'
import PersistLogin from './redux/features/auth/PersistLogin'
import Prefetch from './redux/features/auth/Prefetch'
import EmailVerification from './redux/features/auth/EmailVerfication'
import Cart from './redux/features/cart/Cart'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // const { isAdmin } = useAuth();

  const isLoggedIn = useSelector((state) => selectCurrentToken(state))
  console.log(isLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      isAuthenticated && redirect('/cart')
      setIsAuthenticated(true)
    }

    if (!isLoggedIn) {
      redirect('/login')
      setIsAuthenticated(false)
    }
  }, [isAuthenticated, isLoggedIn]);

  return (
    <>
      <Routes>
        <Route element={<Prefetch />}>
          <Route path="/" element={<Homepage />} />

          <Route path="login" element={<Login />} />

          <Route path="/signup" element={<Register />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/set-password/:token" element={<SetNewPassword />} />

          <Route path="/email-verification" element={<EmailVerification />} />

          <Route element={<PersistLogin />}>

            <Route path="/cart" element={<Cart />} />

          </Route>

        </Route>

      </Routes>
      {/* <Routes>

        <Route path="/" element={<Layout />}>

          {!isAuthenticated
            ? <Route index element={<Login />} />
            : <Route path="/" element={<Navigate replace to="/admin/dashboard" />} />
          }

          {!isAuthenticated
            ? <Route path="login" element={<Login />} />
            : <Route path="login" element={<Navigate replace to="/admin/dashboard" />} />
          }

          {!isAuthenticated
            ? <Route path="login" element={<Register />} />
            : <Route path="login" element={<Navigate replace to="/admin/dashboard" />} />
          }

          {!isAuthenticated
            ? <Route path="forgot-password" element={<ForgotPassword />} />
            : <Route path="forgot-password" element={<Navigate replace to="/admin/dashboard" />} />
          } */}

      {/* Admin Dashboard Routes */}

      { /* End Admin Dashboard Routes */}

      {/* Catch all "*" routes */}
      {/* <Route path="*" element={<PageNotFound message={"Page not found"} />} />

        </Route>
      </Routes> */}
    </>

  )
}

export default App
