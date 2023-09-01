import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectOrderById } from "./ordersApiSlice";

const Order = ({ orderId }) => {
  const order = useSelector((state) => selectOrderById(state, orderId));

  const navigate = useNavigate();

  const { firstName, lastName, phoneNumber } = order.user;

  const date = new Date(order.createdAt).toISOString().split('T')[0];

  const getCourseNames = order => order.courses.map(item => item.course.name).join(', ');

  const courseNames = getCourseNames(order);

  if (order) {
    return (
      <tbody>
        <tr>
          <td scope="row" className="td-dropdown-container">
            <div className="dropdown">
              <span><i className="fas fa-ellipsis-v"></i></span>
              <div className="dropdown-content">
                <button className="dropdown-item" onClick={() => navigate(`/dashboard/admin/orders/${orderId}/view`)}><i className="fas fa-regular fa-order"></i>&nbsp;View Order</button>
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
