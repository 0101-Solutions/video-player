import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useRef, useState, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { useSendLogoutMutation } from "../redux/features/auth/authApiSlice";

import Loader from "./Loader";
import { showErrorToast, showSuccessToast } from "../components/Toast";


const Header = () => {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => selectCurrentToken(state))

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [sendLogout, {
    isLoading,
    isError,
    isSuccess,
    error,
  }] = useSendLogoutMutation();

  useEffect(() => {
    if (isLoggedIn) {
      setIsAuthenticated(true)
    }

    if (!isLoggedIn) {
      redirect('/login')
      setIsAuthenticated(false)
    }
  }, [isLoggedIn]);

  const navRef = useRef(null);
  // true means we show the normal hamburger icon on the ui and false means we show the close icon on the ui
  const [icon, setIcon] = useState(true);

  const handleToggleNav = () => {
    const navIsActive = navRef.current.classList.toggle("header__nav--active");
    if (navIsActive) {
      setIcon(false);
    } else {
      setIcon(true);
    }
  };

  const handleLogout = async () => {
    sendLogout();

    window.location.href = '/'
  };

  useEffect(() => {

    if (isSuccess) navigate("/login")

  }, [isSuccess, navigate])

  return (
    <header className="header">
      {isLoading && <Loader />}

      {isSuccess && showSuccessToast("Logout Successful")}

      {isError && showErrorToast(error?.data?.message)}

      <div className="header__nav-portion">
        <h2 className="header_text">CDL City Driving</h2>
        <nav className="header__nav" ref={navRef}>
          <ol className="header__nav-list">
            {!isAuthenticated ? (
              <>
                <li className="header__nav-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="header__nav-item">
                  <Link to="/#about">About</Link>
                </li>
                <li className="header__nav-item">
                  <Link to="/eldt-courses">ELDT Courses</Link>
                </li>
                {isLoggedIn ? (
                  <li className="header__nav-item">
                    <Link to="/cart">Cart</Link>
                  </li>
                ) : (
                  <></>
                )}
                {isLoggedIn ? (
                  <li className="header__nav-item header__nav-item-bg">
                    <a onClick={handleLogout}>Log Out!</a>
                  </li>
                ) : (
                  <>
                    <li className="header__nav-item">
                      <Link to="/login">Login</Link>
                    </li>
                    <li className="header__nav-item header__nav-item-bg">
                      <Link to="/signup">Register</Link>
                    </li>
                  </>
                )}
              </>
            ) : (
              <>
                <li className="header__nav-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="header__nav-item">
                  <Link to="/dashboard/#about">About</Link>
                </li>
                <li className="header__nav-item">
                  <Link to="/eldt-courses">ELDT Courses</Link>
                </li>
                {isAuthenticated ? (
                  <li className="header__nav-item">
                    <Link to="/cart">Cart</Link>
                  </li>
                ) : (
                  <></>
                )}
                {isAuthenticated ? (
                  <li className="header__nav-item header__nav-item-bg">
                    <a onClick={handleLogout}>Log Out!</a>
                  </li>
                ) : (
                  <>
                    <li className="header__nav-item">
                      <Link to="/dashboard/login">Login</Link>
                    </li>
                    <li className="header__nav-item header__nav-item-bg">
                      <Link to="/dashboard/signup">Register</Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ol>
        </nav>
        <button className="menu-btn" onClick={handleToggleNav}>
          {icon ? <GiHamburgerMenu /> : <AiOutlineClose />}
        </button>
      </div>
    </header>
  );
};

export default Header;