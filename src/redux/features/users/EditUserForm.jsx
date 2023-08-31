import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useDeleteUserMutation, useUpdateUserMutation } from "./usersApiSlice";

import Loader from "../../../components/Loader";
import { showErrorToast, showSuccessToast } from "../../../components/Toast";

const EditUserForm = ({ user }) => {
  const navigate = useNavigate();

  const [updateUser, {
    isError,
    isLoading,
    error
  }] = useUpdateUserMutation();

  const [deleteUser, {
    isError: isDeleteError,
    isLoading: isDeleteLoading,
    error: deleteError
  }] = useDeleteUserMutation();

  const { register, handleSubmit } = useForm({
    defaultValues: user
  });

  const onSubmit = (data) => {
    updateUser({
      id: data._id,
      body: {
        ...data
      }
    });
    showSuccessToast(`'${data.firstName}' user, has been updated successfully.`)
    navigate("/dashboard/admin/users")
  }

  const onDelete = (data) => {
    if (confirm("Are you sure you want to delete this user?") == true) {
      deleteUser(data._id);
      showSuccessToast(`'${data.firstName}' user, has been deleted successfully.`)
      navigate(-1)
    } else {
      showErrorToast(`'${data.firstName}' user, has not been deleted. ${deleteError.message}`)
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
          <h3 className="sign-up__form--title center edit">Edit `{user.firstName}` User</h3>
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
            placeholder="User's First Name"
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
            placeholder="User's Last Name"
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
            placeholder="User's Email"
            {...register("email")}
          />
        </div>
        <div className="form__group">
          <label htmlFor="role" className="form__group--label">
            User Role
          </label>
          <select
            id="role"
            required
            className="form__group--input"
            {...register("role")}
          >
            {user.role && <option value={user.role}>{user.role}</option>}
            {!user.role && <option value="">Select User Role</option>}
            {user.role !== "admin" && <option value="admin">Admin</option>}
            {user.role !== "user" && <option value="user">User</option>}

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
            placeholder="User's Branch"
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
            placeholder="User's PhoneNumber"
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
              placeholder="User's Password"
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
          <button tabIndex={-1} className="btn btn-primary btn-lg">Update User</button>
          <button tabIndex={-1} onClick={handleSubmit(onDelete)} className="btn btn-danger btn-lg ml-5">Delete User</button>
        </div>
      </form>
    </>
  )


  return content;
}

export default EditUserForm