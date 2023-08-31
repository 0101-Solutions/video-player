import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectOrderById } from "./ordersApiSlice";
import useAuth from "../../../hooks/useAuth";

const Order = ({ orderId }) => {
  const order = useSelector((state) => selectOrderById(state, orderId));

  const navigate = useNavigate();

  const { isAdmin } = useAuth();

  const { firstName, lastName, phoneNumber } = order.user;

  const date = new Date(order.createdAt).toISOString().split('T')[0];

  // Loop through the order.courses array and get the course name, separated by a comma
  const getCourseNames = order => order.courses.map(item => item.course.name).join(', ');

  const courseNames = getCourseNames(order);

  if (order) {
    return (
      <tbody>
        <tr>
          <td scope="row">
            <div className="dropdown">
              <span className="dropdown-trigger"><i className="fas fa-ellipsis-v"></i></span>
              <div className="dropdown-content">
                <button className="dropdown-item" onClick={() => navigate(`/dashboard/admin/orders/${orderId}/view`)}><i className="fas fa-regular fa-order"></i>&nbsp;View Order</button>
                {isAdmin && <button className="dropdown-item" onClick={() => navigate(`/dashboard/admin/edit-order/${orderId}`)}><i className="fas fa-cogs text-dark-pastel-green"></i>&nbsp;Edit Order</button>}
              </div>
            </div>
          </td>
          <td>{firstName}{" "}{lastName}</td>
          <td className="text-capitalize">{order.paymentStatus}</td>
          <td>{courseNames}</td>
          <td>{phoneNumber}</td>
          <td>$ {order.total}</td>
          <td>{date}</td>
        </tr>
      </tbody>
    );
  } else {
    return <tbody><tr><td>Sorry, that order does not exist</td></tr></tbody>;
  }
};

Order.propTypes = {
  orderId: propTypes.string.isRequired,
};

export default Order;
