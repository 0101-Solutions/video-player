import {
  AiOutlineTwitter,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillFacebook,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <p className="footer__logo-text">CDL City Driving</p>
        <div className="footer__social">
          <a href="" className="footer__social">
            <AiOutlineTwitter />
          </a>
          <a href="" className="footer__social">
            <AiFillInstagram />
          </a>
          <a href="" className="footer__social">
            <AiFillLinkedin />
          </a>
          <a href="" className="footer__social">
            <AiFillFacebook />
          </a>
        </div>
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
              <Link>About Us</Link>{" "}
            </li>
            <li className="footer__nav-item">
              {" "}
              <Link>Blog</Link>{" "}
            </li>
            <li className="footer__nav-item">
              {" "}
              <Link>Partnerships</Link>{" "}
            </li>
            <li className="footer__nav-item">
              {" "}
              <Link>Careers</Link>{" "}
            </li>
          </ol>
        </div>
        <div className="footer__links-group">
          <p className="footer__links-title">Our Social Media</p>
          <ol className="footer__nav-list">
            <li className="footer__nav-item">
              {" "}
              <Link>Facebook</Link>{" "}
            </li>
            <li className="footer__nav-item">
              {" "}
              <Link>Twitter</Link>{" "}
            </li>
            <li className="footer__nav-item">
              {" "}
              <Link>Instagram</Link>{" "}
            </li>
            <li className="footer__nav-item">
              {" "}
              <Link>Linkedin</Link>{" "}
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