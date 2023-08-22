import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailVerification = () => {

  toast.success("Successfully registered! Check your email to verify.");

  return (
    <div className="registration-success-container">
      <div className="registration-success-content">
        <h1>Registration Successful!</h1>
        <p>Check your email to verify your account.</p>
        <Link to="/">Back to Home</Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmailVerification;