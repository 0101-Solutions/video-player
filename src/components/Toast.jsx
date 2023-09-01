import { useRef, useId } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotification = () => {
  const toastRef = useRef(null);

  return (
    <ToastContainer
      key={useId()}
      ref={toastRef}
      position="top-center"
      style={{ top: "80px" }}
      autoClose={3000}
      closeOnClick
      pauseOnHover
    />
  );
};

const showSuccessToast = (message) => {
  toast.success(message);
};

const showErrorToast = (message) => {
  toast.error(message);
};

export { ToastNotification, showSuccessToast, showErrorToast };