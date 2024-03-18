import { useContext, useState } from "react";
import { API } from "../config";
import { PreloaderContext } from "../contexts/Preloader/PreloaderContext";
import { handlePost } from "../utils/war/users";
import { toast } from "react-toastify";
import { objectUppercase } from "../utils/helpers";

export const useProfile = () => {
  const [profile, setProfile] = useState({});
  const { handlePreloader } = useContext(PreloaderContext);

  const handleUpdate = (data, token) => {
    handlePreloader(true);
    data = objectUppercase(data);
    handlePost(data, token, "POST")
      .then((response) => {
        return response;
      })
      .then((resolve) => {
        if (resolve.ok) {
          window.scroll(0, 0);
          handleAdopter(token);
          toast.success("Datos Actualizado Exitosamente", {
            theme: "colored",
          });
        } else {
          toast.error("No se pudo Actualizar", {
            theme: "colored",
          });
        }
        handlePreloader(false);
      })
      .catch((e) => {
        toast.error("Error, No se pudo Actualizar", {
          theme: "colored",
        });
        console.log(e);
        handlePreloader(false);
      });
  };

  const handleAdopter = async (token) => {
    handlePreloader(true);
    const content = await fetch(`${API.war}users/`, {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    });
    const response = await content.json();
    if (response.ok) {
      setProfile(response.adopter);
    }
    handlePreloader(false);
  };

  const handleAdmin = async (account) => {
    const data =
      JSON.parse(
        sessionStorage.getItem("user_" + String(account).toUpperCase())
      ) ?? "";

    setProfile(data.data);
  };

  return {
    profile,
    handleAdopter,
    handleAdmin,
    setProfile,
    handleUpdate,
  };
};
