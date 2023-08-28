import { useState } from "react";
import propTypes from "prop-types";

const CookieConsentComponent = ({ handleCookieAccept, handleCookieReject }) => {
  const [showConsent, setShowConsent] = useState(true);

  const handleAccept = () => {
    setShowConsent(false);
    handleCookieAccept();
  };

  const handleDecline = () => {
    setShowConsent(false);
    handleCookieReject();
  };

  return (
    <>
      {showConsent && (
        <div className="cookie-consent">
          <p>This website uses cookies to enhance your experience.</p>
          <button onClick={handleAccept}>Accept</button>
          <button onClick={handleDecline}>Decline</button>
        </div>
      )}
    </>
  );
};

CookieConsentComponent.propTypes = {
  handleCookieAccept: propTypes.func,
  handleCookieReject: propTypes.func,
};

export default CookieConsentComponent;