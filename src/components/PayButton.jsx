import axios from 'axios';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';

import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { clearCart } from '../redux/features/cart/cartSlice';
import { showErrorToast, showSuccessToast } from './Toast';

const url = "https://cdlcity-api.azurewebsites.net/api/v1"

const PayButton = ({ cartItems }) => {
  const isLoggedIn = useSelector((state) => selectCurrentToken(state));

  let content;

  const handleCheckout = () => {
    showSuccessToast("You will be redirected to the payment page shortly.")
    setTimeout(() => {
      clearCart()
    }, 900);
    axios
      .post(`${url}/stripe/checkout-session`, {
        cartItems,
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