import { useState, useEffect } from 'react'

import { Route, Routes, redirect } from "react-router-dom"

// import { Routes, Route, Navigate, redirect } from "react-router-dom"
import { useSelector } from 'react-redux'

// import useAuth from './hooks/useAuth'
import { selectCurrentToken } from './redux/features/auth/authSlice'

import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import SetNewPassword from './pages/SetNewPassword'
import PersistLogin from './redux/features/auth/PersistLogin'
import Prefetch from './redux/features/auth/Prefetch'
import EmailVerification from './pages/EmailVerfication'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // const { isAdmin } = useAuth();

  const isLoggedIn = useSelector((state) => selectCurrentToken(state))

  useEffect(() => {
    if (isLoggedIn) {
      isAuthenticated && redirect('/admin/dashboard')
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
        <Route path="/" element={<Homepage />} />

        <Route path="login" element={<Login />} />

        <Route path="/signup" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/set-password/:token" element={<SetNewPassword />} />

        <Route element={<PersistLogin />}>

          <Route element={<Prefetch />}>

            <Route path="/email-verification" element={<EmailVerification />} />

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
