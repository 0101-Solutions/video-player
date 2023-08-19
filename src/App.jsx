import { useState, useEffect } from 'react'

import { Route, Routes, redirect } from "react-router-dom"

// import { Routes, Route, Navigate, redirect } from "react-router-dom"
import { useSelector } from 'react-redux'

// import useAuth from './hooks/useAuth'
import { selectCurrentToken } from './redux/features/auth/authSlice'
import Homepage from './pages/Homepage'

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
