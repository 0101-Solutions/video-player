import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__top">
        <p className="footer__logo-text">ELDT Training Center</p>

      </div>

      <div className="footer__links">
        <div className="footer__links-group">
          <p className="footer__links-title">Contacts</p>
          <ol className="footer__nav-list">
            <li className="footer__nav-item">
              <Link>2700 Zanker Rd</Link>{" "}
            </li>
            <li className="footer__nav-item">
              <Link>San Jose California 95134</Link>{" "}
            </li>
            <li className="footer__nav-item">
              <Link>email: <p className="text-lowercase">info@eldttraining.com</p></Link>{" "}
            </li>
          </ol>
        </div>
        <div className="footer__links-group">
          <p className="footer__links-title">company</p>
          <ol className="footer__nav-list">
            <li className="footer__nav-item">
              {" "}
              <Link to="/">Home</Link>{" "}
            </li>
            <li className="footer__nav-item">
              {" "}
              <Link to="/about">About Us</Link>{" "}
            </li>
            <li className="footer__nav-item">
              {" "}
              <Link to="/eldt-courses">ELDT Course Certificate</Link>{" "}
            </li>
          </ol>
        </div>
      </div><div className="footer__copyright">
        <p>The moment you complete the course we report the completion to the Federal Registry. You can then begin the behind-the-wheel training.</p>
        <p>&copy; {date} ELDT Training. All rights reserved</p>
      </div>
    </footer >
  );
};

export default Footer;