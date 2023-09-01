import { Link } from "react-router-dom";

import ConfettiExplosion from "react-confetti-explosion";

const CompleteCoursePage = () => {
  return (
    <div className="payment-successful" style={{ "height": "43.2vh" }}>
      <h2>Course Completed Successfully</h2>
      <ConfettiExplosion style={{ "left": "50%", "translateX": "-50%" }} force={0.8} duration={5000} particleCount={1000} width={2000} />
      <p>
        You will receive your certificate in your email. You can also view your certificate
        {" "} <Link to="/dashboard/completed-course">by clicking here</Link>.
      </p>
    </div>
  )
}

export default CompleteCoursePage