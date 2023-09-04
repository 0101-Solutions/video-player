import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "./authApiSlice";
import { showErrorToast, showSuccessToast } from "../../../components/Toast";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [forgotPassword, { isSuccess, isError, error }] = useForgotPasswordMutation();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    forgotPassword(data.email);
  };

  let content;

  console.log(isSuccess)

  if (isSuccess) {
    showSuccessToast("Password reset link sent to your email address");
    navigate("/login")
  }

  if (isError) {
    showErrorToast(error.data.message);
  }

  content = (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h3 className="sign-up__form--title center">Forgot Password</h3>
        <div className="form__group">
          <label htmlFor="mail" className="form__group--label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="form__group--input"
            placeholder="Your registered email address"
            {...register("email")}
          />
        </div>
        <button className="form__button">Reset Password</button>
        <p className="text-right" style={{ "marginTop": "-3rem" }}>
          <Link to="/login">Existing User?</Link>
        </p>
      </form>
    </div>
  );

  return content;
};
export default ForgotPassword;