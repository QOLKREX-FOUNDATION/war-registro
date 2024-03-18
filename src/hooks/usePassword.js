import { useState } from "react";
import { API } from "../config";

export const usePassword = () => {
  const [validation, setValidation] = useState(false);

  const validatePassword = (password, confirm) => {
    setValidation(password === confirm);
  };

  const postPasword = async (passwordOld, password, token) => {
    const content = await fetch(`${API.war}users/passwordUpdate`, {
      body: JSON.stringify({ passwordOld, password }),
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      method: "POST",
    });
    const response = await content.json();
    return response.ok;
  };

  return {
    validation,
    validatePassword,
    postPasword,
  };
};
