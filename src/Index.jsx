import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { PreloaderContext } from "./contexts/Preloader/PreloaderContext";
import Preloader from "./components/atoms/Preloader/Preloader";

export const Index = ({ children }) => {
  const { preloader } = useContext(PreloaderContext);

  return (
    <>
      {children}
      <ToastContainer />
      {preloader.preloader && <Preloader />}
    </>
  );
};
