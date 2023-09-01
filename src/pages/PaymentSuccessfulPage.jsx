import { Link } from "react-router-dom";

import { clearCart } from "../redux/features/cart/cartSlice";
import ConfettiExplosion from "react-confetti-explosion";

const PaymentSuccessful = () => {
  setTimeout(() => {
    clearCart();
    window.location.href = "/dashboard/eldt-courses";
  }, 5000);

  return (
    <div className="payment-successful" style={{ "height": "60vh" }}>
      <div className="payment-successful-container">
        <h2>Payment Successful</h2>
        <ConfettiExplosion force={0.8} duration={5000} particleCount={500} width={1600} />
        <p>
          You will shortly be redirected to the video courses page. You can also access your purchased course video(s)
          {" "} <Link to="/video-courses">by clicking here</Link>.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessful;