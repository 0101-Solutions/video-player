import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/features/auth/authSlice";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  let isAdmin = false;


  if (token) {

    const decodedToken = jwtDecode(token);

    const { firstName, lastName, email, role, status } = decodedToken.UserInfo;

    console.log(status)

    if (role === "admin") {
      isAdmin = true;
    }


    return { firstName, lastName, role, email, status, isAdmin };
  }
  return { firstName: "", lastName: "", role: "", email: "", status: "", isAdmin };
};

export default useAuth;