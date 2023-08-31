import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/features/auth/authSlice";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  let isAdmin = false;

  let status = "";

  if (token) {

    const decodedToken = jwtDecode(token);

    const { firstName, lastName, email, role } = decodedToken.UserInfo;

    if (role === "admin") {
      isAdmin = true;
      status = "admin";
    }


    return { firstName, lastName, role, email, status, isAdmin };
  }
  return { firstName: "", lastName: "", role: "", email: "", status, isAdmin };
};

export default useAuth;