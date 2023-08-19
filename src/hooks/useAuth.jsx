import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/features/auth/authSlice";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  let isAdmin = false;
  let isHeadOfDepartment = false;
  let isTeacher = false;

  let status = "";

  if (token) {

    const decodedToken = jwtDecode(token);

    const { username, email, roles } = decodedToken.UserInfo;

    isAdmin = roles.includes("admin" || "Admin");
    isHeadOfDepartment = roles.includes("headofdepartment" || "HeadOfDepartment");
    isTeacher = !isAdmin && !isHeadOfDepartment; // truthy

    if (isAdmin) {
      status = "Admin";
    }

    if (isHeadOfDepartment) {
      status = "Head of Department";
    }

    if (isTeacher) {
      status = "Teacher";
    }

    return { username, roles, email, status, isAdmin, isHeadOfDepartment, isTeacher };
  }
  return { username: "", roles: [], email: "", status, isAdmin, isHeadOfDepartment, isTeacher };
};

export default useAuth;