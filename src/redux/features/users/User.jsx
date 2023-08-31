import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserById } from "./usersApiSlice";
import useAuth from "../../../hooks/useAuth";
import normalizePhoneNumber from "../../../utils/phoneNumbers";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  const navigate = useNavigate();

  const { isAdmin } = useAuth();

  const phoneNumber = normalizePhoneNumber(user.phoneNumber);

  if (user) {
    return (
      <tbody>
        <tr>
          <td scope="row">
            <div className="dropdown">
              <span className="dropdown-trigger"><i className="fas fa-ellipsis-v"></i></span>
              <div className="dropdown-content">
                <button className="dropdown-item" onClick={() => navigate(`/dashboard/admin/users/${userId}/view`)}><i className="fas fa-regular fa-user"></i>&nbsp;View User</button>
                {isAdmin && <button className="dropdown-item" onClick={() => navigate(`/dashboard/admin/edit-user/${userId}`)}><i className="fas fa-cogs text-dark-pastel-green"></i>&nbsp;Edit User</button>}
              </div>
            </div>
          </td>
          <td className="text-capitalize">{user.firstName}{" "}{user.lastName}</td>
          <td>{user.branch}</td>
          <td>{user.courses.length}</td>
          <td>{phoneNumber}</td>
          <td>{user.email}</td>
          <td className="text-capitalize">{user.role}</td>
        </tr>
      </tbody>
    );
  } else {
    return <tbody><tr><td>Sorry, that user does not exist</td></tr></tbody>;
  }
};

User.propTypes = {
  userId: propTypes.string.isRequired,
};

export default User;
