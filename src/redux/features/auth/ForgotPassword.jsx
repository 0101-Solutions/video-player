import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    // the data object contains the user input information which will be used for validation and register
    // console.log(data);
  };

  return (
    <div className="forgot_password">
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <h3 className="sign-up__form--title center">Forgot Password</h3>
        <div className="form__group">
          <label htmlFor="mail" className="form__group--label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="form__group--input"
            placeholder="your email address"
            {...register("email")}
          />
        </div>
        <button className="form__button">Reset Password</button>
      </form>
    </div>
  );
};
export default ForgotPassword;