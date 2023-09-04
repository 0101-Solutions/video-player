import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NotFoundPage = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="not-found-container" style={{ "height": "53vh" }}>
      <div className="animated-text">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">
          Oops! The page you are looking for does not exist.
        </p>
        {isAdmin ? (
          <Link to="/dashboard/admin" className="home-button">
            Head Over to Admin Dashboard
          </Link>
        ) : (
          <Link to="/" className="home-button">
            Go to Home Page
          </Link>
        )}
      </div>
    </div>
  );
};

export default NotFoundPage;