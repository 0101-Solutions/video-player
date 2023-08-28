import { Link } from "react-router-dom";
import Footer from "./Footer";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="animated-text">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">
          Oops! The page you are looking for does not exist.
        </p>
        <Link to="/" className="home-button">
          Go to Home Page
        </Link>
        <Footer />
      </div>
    </div>
  );
};

export default NotFoundPage;