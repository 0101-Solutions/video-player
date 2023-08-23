import { Link } from "react-router-dom";

import Header from "../components/Header";
import { ToastNotification, showSuccessToast } from "../components/Toast";
// import Footer from "../components/Footer";

const PaymentSuccessful = () => {
  // You can customize the success message
  const successMessage = "Payment Successful! Thank you for your purchase.";

  // Trigger the success toast
  showSuccessToast(successMessage);

  // Redirect after staying on page for 5 seconds
  setTimeout(() => {
    window.location.href = "/video-courses";
  }, 5000);

  return (
    <div className="payment-successful">
      <Header />
      <div className="payment-successful-container">
        <h2>Payment Successful</h2>
        <p>
          You will shortly be redirected to the video courses page. You can also access your purchased course video(s)
          {" "} <Link to="/video-courses">by clicking here</Link>.
        </p>
      </div>
      <ToastNotification />

    </div>
  );
};

export default PaymentSuccessful;