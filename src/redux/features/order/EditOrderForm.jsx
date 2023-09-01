import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useDeleteOrderMutation, useUpdateOrderMutation } from "./ordersApiSlice";

import Loader from "../../../components/Loader";
import { showErrorToast, showSuccessToast } from "../../../components/Toast";

const EditOrderForm = ({ order }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: order
  });

  const navigate = useNavigate();

  const [updateOrder, {
    isError,
    isLoading,
    error
  }] = useUpdateOrderMutation();

  const getCourseNames = order => order.courses.map(item => item.course.name).join(', ');

  const courseNames = getCourseNames(order);

  const [deleteOrder, {
    isError: isDeleteError,
    isLoading: isDeleteLoading,
    error: deleteError
  }] = useDeleteOrderMutation();

  const onSubmit = (data) => {
    updateOrder({
      id: data._id,
      body: {
        ...data
      }
    });
    showSuccessToast(`'${data.firstName}' order, has been updated successfully.`)
    navigate("/dashboard/admin/orders")
  }

  const onDelete = (data) => {
    if (confirm("Are you sure you want to delete this order?") == true) {
      deleteOrder(data._id);
      showSuccessToast(`'${data.firstName}' order, has been deleted successfully.`)
      navigate(-1)
    } else {
      showErrorToast(`'${data.firstName}' order, has not been deleted. ${deleteError.message}`)
    }
  };

  let content;

  if (isLoading || isDeleteLoading) {
    content = <Loader />
  }

  if (isError || isDeleteError) {
    showErrorToast(error.message)
  }

  const showPassword = () => {
    var x = document.getElementById("password");

    var y = document.getElementById("togglePassword");

    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }

    if (y.innerHTML === "Hide") {
      y.innerHTML = "Show";
    } else {
      y.innerHTML = "Hide";
    }
  }

  content = (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
        <div >
          <a onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left arrow"></i></a>
          <h3 className="sign-up__form--title center edit">Edit Order</h3>
        </div>
        <div className="form__group">
          <label htmlFor="courseNames" className="form__group--label">
            Course Name(s)
          </label>
          <input
            type="text"
            id="courseNames"
            required
            disabled
            value={courseNames}
            className="form__group--input"
            placeholder="Order's Course Name(s)"
          />
        </div>
        <div className="form__group">
          <label htmlFor="lastName" className="form__group--label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            required
            className="form__group--input"
            placeholder="Order's Last Name"
            {...register("lastName")}
          />
        </div>
        <div className="form__group">
          <label htmlFor="email" className="form__group--label">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="form__group--input"
            placeholder="Order's Email"
            {...register("email")}
          />
        </div>
        <div className="form__group">
          <label htmlFor="role" className="form__group--label">
            Order Role
          </label>
          <select
            id="role"
            required
            className="form__group--input"
            {...register("role")}
          >
            {order.role && <option value={order.role}>{order.role}</option>}
            {!order.role && <option value="">Select Order Role</option>}
            {order.role !== "admin" && <option value="admin">Admin</option>}
            {order.role !== "order" && <option value="order">Order</option>}

          </select>
        </div>
        <div className="form__group">
          <label htmlFor="branch" className="form__group--label">
            Branch
          </label>
          <input
            type="text"
            id="branch"
            required
            className="form__group--input"
            placeholder="Order's Branch"
            {...register("branch")}
          />
        </div>
        <div className="form__group">
          <label htmlFor="phoneNumber" className="form__group--label">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            required
            className="form__group--input"
            placeholder="Order's PhoneNumber"
            {...register("phoneNumber")}
          />
        </div>
        <div className="form__group">
          <label htmlFor="password" className="form__group--label">
            Password
          </label>
          <div className="password-input">
            <input
              type="password"
              id="password"
              required
              className="form__group--input"
              placeholder="Order's Password"
              {...register("password")}
            />
            <button
              id="togglePassword"
              type="button"
              className="show-password-button"
              onClick={showPassword}
            >
              {showPassword ? "Show" : "Hide"}
            </button>
          </div>
        </div>
        <div className="d-grid gap-2">
          <button tabIndex={-1} className="btn btn-primary btn-lg">Update Order</button>
          <button tabIndex={-1} onClick={handleSubmit(onDelete)} className="btn btn-danger btn-lg ml-5">Delete Order</button>
        </div>
      </form>
    </>
  )


  return content;
}

export default EditOrderForm