
import { useForm } from "react-hook-form";

const SetNewPassword = () => {
  const {
    register, handleSubmit } = useForm();

  const onSubmit = () => {
    // the data object contains the user input information which will be used for validation and login
    // console.log(data);
  };

  return (
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
            type="confirmPassword"
            id="confirmPassword"
            className="form__group--input"
            placeholder="Confirm Your Password"
            {...register("confirmPassword")}
          />
        </div>
        <button className="form__button">Set New Password</button>
      </form>
    </div>
  );
};
export default SetNewPassword;