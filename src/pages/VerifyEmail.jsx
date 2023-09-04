import ConfettiExplosion from 'react-confetti-explosion';
import { useNavigate, useParams } from 'react-router-dom'
import { useVerifyEmailMutation } from '../redux/features/auth/authApiSlice';
import { showErrorToast, showSuccessToast } from '../components/Toast';
import { useEffect } from 'react';

const VerifyEmail = () => {
  const navigate = useNavigate()

  const { token } = useParams();
  console.log(token)

  const [verifyEmail, { isSuccess, isError, error }] = useVerifyEmailMutation();

  // The token is in the url params and we want to send it to the backend to verify the user when the component mounts
  useEffect(() => {
    verifyEmail({ token })
  }, [token, verifyEmail])

  let content;

  if (isSuccess) {
    showSuccessToast("Email verified successfully");
    navigate("/login")
  }

  if (isError) {
    showErrorToast(error.data.message);
  }


  content = (
    <div className="payment-successful" style={{ "height": "43.2vh" }}>
      <h2>Email Verified Successfully</h2>
      <ConfettiExplosion style={{ "left": "50%", "translateX": "-50%" }} force={0.8} duration={5000} particleCount={1000} width={2000} />
      <p>
        Welcome to CDL City Driving School.
      </p>
    </div>
  )

  return content;
}

export default VerifyEmail