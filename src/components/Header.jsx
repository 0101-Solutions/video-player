import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentToken } from "../redux/features/auth/authSlice";

const Header = () => {
  const isLoggedIn = useSelector((state) => selectCurrentToken(state));

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

  return (
    <header className="header">
      <div className="header__nav-portion">
        <h2 className="header_text">CDL City Driving</h2>
        <nav className="header__nav" ref={navRef}>
          <ol className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="header__nav-item">
              {/* <Link to="/#about">about</Link> */}
              {/* <ScrollLink to="about" smooth={true} duration={500}>About</ScrollLink> */}
              <a href="/#about">About</a>
            </li>
            <li className="header__nav-item">
              <a href="/#courses">ELDT Courses</a>
            </li>
            {isLoggedIn ? (
              <li className="header__nav-item">
                <a href="#">Welcome!</a>
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