
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSetNewPasswordMutation } from "./authApiSlice";
import { showErrorToast, showSuccessToast } from "../../../components/Toast";

const SetNewPassword = () => {
  const navigate = useNavigate();

  const [setNewPassword, { isSuccess, isError, error }] = useSetNewPasswordMutation();
  const { token } = useParams();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setNewPassword({ data, token })
  };

  let content;

  if (isSuccess) {
    showSuccessToast("Password reset successful. Try loggin in with the newly created password");
    navigate("/login")
  }

  if (isError) {
    showErrorToast(error.data.message);
  }

  content = (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h3 className="sign-up__form--title center">Set New Password</h3>
        <div className="form__group">
          <label htmlFor="password" className="form__group--label">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            className="form__group--input"
            placeholder="Your Password"
            {...register("password")}
          />
        </div>
        <div className="form__group">
          <label htmlFor="confirmPassword" className="form__group--label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            required
            className="form__group--input"
            placeholder="Confirm Your Password"
            {...register("confirmPassword")}
          />
        </div>
        <button className="form__button">Set New Password</button>
        <p className="text-right" style={{ "marginTop": "-3rem" }}>
          <Link to="/login">Remembered Password?</Link>
        </p>
      </form>
    </div>
  );

  return content;
};

export default SetNewPassword;