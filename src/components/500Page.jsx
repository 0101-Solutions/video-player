import { useEffect } from "react";

const ServerErrorPage = () => {
  useEffect(() => {
    setTimeout(() => {
      document.body.classList.remove("loading");
    }, 1000);
  }, []);

  return (
    <div className="server-error-container">
      <div className="animated-text">
        <h1 className="server-error-title">500</h1>
        <p className="server-error-message">
          Oops! Something went wrong. Please try again later.
        </p>
      </div>
      <div className="gears">
        <div className="gear one">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className="gear two">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className="gear three">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </div>
  );
};

export default ServerErrorPage;