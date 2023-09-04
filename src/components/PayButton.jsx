import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';

import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { clearCart } from '../redux/features/cart/cartSlice';
import { showErrorToast, showSuccessToast } from './Toast';

const url = "http://localhost:3080/api/v1"

const PayButton = ({ cartItems }) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => selectCurrentToken(state));

  let content;

  const handleCheckout = () => {
    showSuccessToast("You will be redirected to the payment page shortly.")

    const cart = cartItems;

    dispatch(clearCart())

    axios
      .post(`${url}/stripe/checkout-session`, {
        cartItems: cart,
        isLoggedIn,
        withCredentials: true
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => showErrorToast(err.message));
  };

  content = (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  )

  return content
}

PayButton.propTypes = {
  cartItems: propTypes.array.isRequired
}

export default PayButton