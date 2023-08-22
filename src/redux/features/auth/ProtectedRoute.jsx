import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import propTypes from "prop-types";

import Loader from "../../../components/Loader";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else if (isAdmin === true && user.role !== "Admin") {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

ProtectedRoute.propTypes = {
  isAdmin: propTypes.bool,
  children: propTypes.node.isRequired,
};


export default ProtectedRoute;