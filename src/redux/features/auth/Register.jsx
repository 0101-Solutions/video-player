import { useEffect, useRef, useState } from 'react'

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { ToastNotification, showErrorToast, showSuccessToast } from '../../../components/Toast';
import trailer from "../../../assets/Images/trailer.jpg";

import usePersist from '../../../hooks/usePersist'

import { useRegisterMutation } from './authApiSlice'
import { setCredentials } from './authSlice'

import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet-async';
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Register = () => {
  const [errMsg, setErrorMsg] = useState('')

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userRef = useRef(null);

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const password = watch("password");

  const [signup, { isSuccess }] = useRegisterMutation();

  const [persist, setPersist] = usePersist();

  useEffect(() => {
    userRef.current?.focus();

  }, []);

  const showPassword = () => {
    var x = document.getElementById("password") || document.getElementById("confirm-password");

    var y = document.getElementById("togglePassword");

    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }

    if (y.innerHTML === "Show Password") {
      y.innerHTML = "Hide Password";
    } else {
      y.innerHTML = "Show Password";
    }
  }

  const onSubmit = async (data) => {
    try {
      const { accessToken } = await signup({ firstName: data.firstName, lastName: data.lastName, email: data.email, phoneNumber: data.phoneNumber, branch: data.branch, password: data.password }).unwrap()

      dispatch(setCredentials({ accessToken }))

      // TO-DO: Check if user has verified their email.
      // If so, redirect to the dashboard else redirect to the email verification page.

      navigate('/dashboard')
    } catch (err) {
      if (!err.status) {
        setErrorMsg('No Server Response');
      } else if (err.status === 400) {
        setErrorMsg('Missing Email or Password');
      } else if (err.status === 401) {
        setErrorMsg(err.data.message);
      } else {
        setErrorMsg(err.data?.message);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>CDL City Driving School Login</title>
        <meta name="description" content="Login - CDL City Driving School App" />
        <meta name="keyword" content="CDL City Driving School" />
        <meta property="og:title" content="CDL City Driving School App" />
        <link rel="canonical" href="https://eldttrucking.com" />
      </Helmet>
      <div className="register">
        <Header />

        {isSuccess && showSuccessToast('Login Successful')}

        {errMsg && showErrorToast(errMsg)}

        <div className="sign-up-form__container">
          <div className="sign-up__left">
            <h3 className="sign-up__left--title">
              Learn from the best instructors around the world
            </h3>
            <img
              src={trailer}
              alt="learn from the best instructors around the world"
              className="form__img"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="sign-up__form">
            <h3 className="sign-up__form--title">Register</h3>
            <div className="form__group">
              <label htmlFor="firstName" className="form__group--label">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className={`form__group--input ${errors.firstName ? "invalid" : ""
                  }`}
                placeholder="First Name"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <p className="error-message">This field is required</p>
              )}
            </div>
            <div className="form__group">
              <label htmlFor="lastName" className="form__group--label">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className={`form__group--input ${errors.lastName ? "invalid" : ""
                  }`}
                placeholder="Last Name"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <p className="error-message">This field is required</p>
              )}
            </div>
            <div className="form__group">
              <label htmlFor="branch" className="form__group--label">
                Select a Branch
              </label>
              <select
                id="branch"
                className={`form__group--input ${errors.branch ? "invalid" : ""}`}
                {...register("branch", { required: true })}
              >
                <option value="">Select -----</option>
                <option value="Salt Lake City Utah">Salt Lake City Utah</option>
                <option value="Columbus Ohio">Columbus Ohio</option>
                <option value="Minneapolis Minnesota">
                  Minneapolis Minnesota
                </option>
                <option value="Saint Cloud Minnesota">
                  Saint Cloud Minnesota
                </option>
              </select>
              {errors.branch && (
                <p className="error-message">This field is required</p>
              )}
            </div>
            <div className="form__group">
              <label htmlFor="email" className="form__group--label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={`form__group--input ${errors.emailAddress ? "invalid" : ""
                  }`}
                placeholder="email address eg example@gmail.com"
                {...register("email", { required: true })}
              />
              {errors.emailAddress && (
                <p className="error-message">This field is required</p>
              )}
            </div>
            <div className="form__group">
              <label htmlFor="phoneNumber" className="form__group--label">
                Phone Number
              </label>
              <PhoneInput
                id="phoneNumber"
                name="phoneNumber"
                className={`form__group--input ${errors.phoneNumber ? "invalid" : ""
                  }`}
                placeholder="Enter your phone number"
                defaultCountry="US" // Set default country to USA
                {...register("phoneNumber", { required: true })}
              />
              {errors.phoneNumber && (
                <p className="error-message">This field is required</p>
              )}
            </div>
            <div className="form__group">
              <label htmlFor="password" className="form__group--label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`form__group--input ${errors.password ? "invalid" : ""
                  }`}
                placeholder="create a strong password"
                min={8}
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="error-message">This field is required</p>
              )}
              <button
                type="button"
                id="togglePassword"
                className="show-password-button"
                onClick={showPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="form__group">
              <label htmlFor="confirm-password" className="form__group--label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className={`form__group--input ${errors.confirmPassword ? "invalid" : ""
                  }`}
                min={8}
                placeholder="confirm your password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword.message}</p>
              )}
              <button
                type="button"
                id="togglePassword"
                className="show-password-button"
                onClick={showPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="form__group form__group--remember">
              <label htmlFor="persist" className="form__group--label">
                Trust This Device?
              </label>
              <input
                type="checkbox"
                id="persist"
                className="form__group--checkbox"
                checked={persist}
                onChange={(e) => setPersist(e.target.checked)}
              />
            </div>

            <button className="form__button">Register</button>
          </form>
        </div>
        <ToastNotification />
        <Footer />
      </div>
    </>
  );
};
export default Register;