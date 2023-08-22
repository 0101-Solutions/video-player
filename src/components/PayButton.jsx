import axios from 'axios';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';

import { url } from "../redux/api/apiSlice";
import { selectCurrentToken } from "../redux/features/auth/authSlice";

const PayButton = ({ cartItems }) => {
  const isLoggedIn = useSelector((state) => selectCurrentToken(state));

  const handleCheckout = () => {
    axios
      .post(`${url}/stripe/checkout-session`, {
        cartItems,
        isLoggedIn,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  )
}

PayButton.propTypes = {
  cartItems: propTypes.array.isRequired
}

export default PayButton