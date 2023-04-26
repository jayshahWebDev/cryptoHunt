import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastMessage = (type, message) => {
  switch (type) {
    case "error":
      return toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

    case "success":
      return toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

    default:
      break;
  }
};

export { toastMessage };
