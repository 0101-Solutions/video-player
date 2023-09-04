import { useEffect, useRef } from 'react'
import { showErrorToast, showSuccessToast } from '../../../components/Toast';

import usePersist from '../../../hooks/usePersist'

import { useLoginMutation } from './authApiSlice'
import { setCredentials } from './authSlice'

import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet-async';
import jwtDecode from 'jwt-decode';

const Login = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userRef = useRef(null);

  const { register, handleSubmit } = useForm();

  const [login] = useLoginMutation();

  const [persist, setPersist] = usePersist();

  const handleToggle = () => setPersist(prev => !prev)

  useEffect(() => {
    userRef.current?.focus();

  }, []);

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

  const onSubmit = async (data) => {
    try {
      const { accessToken } = await login({ email: data.email, password: data.password }).unwrap()

      dispatch(setCredentials({ accessToken }))
      showSuccessToast('Login Successful. Welcome!')

      const decodedToken = jwtDecode(accessToken)

      const { role } = decodedToken.UserInfo

      if (role === 'admin') {
        navigate('/dashboard/admin')
      } else {
        navigate('/dashboard/eldt-courses')
      }
    } catch (err) {
      if (!err.status) {
        showErrorToast('No Server Response');
      } else if (err.status === 400) {
        showErrorToast('Missing Email or Password');
      } else if (err.status === 401) {
        showErrorToast(err.data.message);
      } else {
        showErrorToast(err.data?.message);
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
        <link rel="canonical" href="https://www.eldttrucking.com" />
      </Helmet>
      <div className="login">
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <h3 className="sign-up__form--title center">Login</h3>
          <div className="form__group">
            <label htmlFor="mail" className="form__group--label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              ref={userRef}
              className="form__group--input"
              placeholder="Your Email Address"
              {...register("email")}
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
          <div className="form__group form__group--remember">
            <label htmlFor="persist" className="form__group--label">
              Trust This Device?
            </label>
            <input
              type="checkbox"
              id="persist"
              name="persist"
              className="form__group--checkbox"
              checked={persist}
              onChange={handleToggle}
            />
          </div>
          <button className="form__button">Login</button>
          <p className="text-right" style={{ "marginTop": "-3rem" }}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;