import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/features/auth/authSlice";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  let isAdmin = false;

  let status = "";

  if (token) {

    const decodedToken = jwtDecode(token);

    const { firstName, lastName, email, roles } = decodedToken.UserInfo;

    isAdmin = roles.includes("admin" || "Admin");

    if (isAdmin) {
      status = "Admin";
    }

    return { firstName, lastName, roles, email, status, isAdmin };
  }
  return { firstName: "", lastName: "", roles: [], email: "", status, isAdmin };
};

export default useAuth;