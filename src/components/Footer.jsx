import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <p className="footer__logo-text">CDL City Driving</p>

      </div>

      <div className="footer__links">
        <div className="footer__links-group">
          <p className="footer__links-title">Contacts</p>
          <ol className="footer__nav-list">
            <li className="footer__nav-item">
              <Link>Application via this website</Link>{" "}
            </li>
            <li className="footer__nav-item">
              <Link>Call Us: +414-897654</Link>{" "}
            </li>
            <li className="footer__nav-item">
              <Link>email: cdlcity@drivingschool.com</Link>{" "}
            </li>
          </ol>
        </div>
        <div className="footer__links-group">
          <p className="footer__links-title">company</p>
          <ol className="footer__nav-list">
            <li className="footer__nav-item">
              {" "}
              <Link to="/about">About Us</Link>{" "}
            </li>
            <li className="footer__nav-item">
              {" "}
              <Link to="/eldt-courses">ELDT Courses</Link>{" "}
            </li>
          </ol>
        </div>
      </div>
      <p className="footer__copyright">
        &copy; 2023 CDL City Driving School. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;