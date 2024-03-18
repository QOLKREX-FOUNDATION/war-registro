import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { resolve } from "styled-jsx/css";
import { PreloaderContext } from "../contexts/Preloader/PreloaderContext";
import { handleAuth } from "../utils/auth";
import { clearText } from "../utils/validations";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { handlePreloader } = useContext(PreloaderContext);

  const onLogin = (e, handleToken) => {
    e.preventDefault();
    handlePreloader(true);
    handleAuth(String(clearText(email)).toUpperCase(), password, handleToken)
      .then((resolve) => resolve)
      .then((response) => {
        response
          ? router.push("/adopter")
          : toast.error("Credencial Incorrecta");
        handlePreloader(false);
      })
      .catch((e) => {
        toast.error("Credencial Incorrecta");
        handlePreloader(false);
      });
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    onLogin,
  };
};
