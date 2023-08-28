import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-container">
      <div className="emoji-container">
        <div className="emoji">🚫</div>
        <div className="emoji">🚫</div>
        <div className="emoji">🚫</div>
        <div className="emoji">🚫</div>
      </div>
      <h1 className="unauthorized-title">Access Denied</h1>
      <p className="unauthorized-message">
        You do not have permission to view this site.
      </p>
      <Link to="/login" className="unauthorized-message">
        Try Logging In Again To Access This Page
      </Link>
      <p className="error-code">Error Code: 401 Unauthorized</p>
    </div>
  );
};

export default UnauthorizedPage;