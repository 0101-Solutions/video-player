import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAddNewOrderMutation } from "./ordersApiSlice";

import { showErrorToast, showSuccessToast } from "../../../components/Toast";
import Loader from "../../../components/Loader";

const NewOrderForm = ({ order }) => {
  const navigate = useNavigate();

  const [addNewOrder, {
    isError,
    isLoading,
    error
  }] = useAddNewOrderMutation();

  const { register, handleSubmit } = useForm({
    defaultValues: order
  });

  const onSubmit = (data) => {
    addNewOrder({ data });
    showSuccessToast(`'${data.firstName}' order, has been created successfully.`)
    navigate("/dashboard/admin/orders")
  }

  let content;

  if (isLoading) {
    content = <Loader />
  }

  if (isError) {
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
          <h3 className="sign-up__form--title center edit">Create New Order</h3>
        </div>
        <div className="form__group">
          <label htmlFor="firstName" className="form__group--label">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            required
            className="form__group--input"
            placeholder="Your First Name"
            {...register("firstName")}
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
            placeholder="Your Last Name"
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
            placeholder="Your Email"
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
            <option value="">Select Order Role</option>
            <option value="admin">Admin</option>
            <option value="order">Order</option>

          </select>
        </div>
        <div className="form__group">
          <label htmlFor="branch" className="form__group--label">
            Branch
          </label>
          <input
            type="url"
            id="branch"
            required
            className="form__group--input"
            placeholder="Your Branch"
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
              placeholder="Your Password"
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
        <button className="form__button">Create Order</button>
      </form>
    </>
  )


  return content;
}

export default NewOrderForm