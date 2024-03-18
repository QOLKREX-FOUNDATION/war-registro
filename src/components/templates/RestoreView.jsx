import Image from "next/image";
import { IoIosLock } from "react-icons/io";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/router";
import { handleRestore } from "../../utils/war/users";
import { useForm } from "react-hook-form";
import { regexText } from "../../utils/validations";
import { useState } from "react";
import { toast } from "react-toastify";
import { usePreloaderContext } from "../../contexts";
import { useStateContext } from "../../contexts/ContextProvider";
import { MainTitle } from "../atoms/MainTitle";

const Background = ({ children }) => {
  const { currentColor } = useStateContext();

  let bg;

  switch (currentColor) {
    case "#1A97F5":
      bg = {
        background: "#1A97F5",
        background: "linear-gradient(90deg, #1A97F5 10%, #00a99d 100%)",
      };
      break;
    case "#00CC56":
      bg = {
        background: "#00CC56",
        background: "linear-gradient(90deg, #00CC56 10%, #00390c 100%)",
      };
      break;
    case "#7352FF":
      bg = {
        background: "#7352FF",
        background: "linear-gradient(90deg, #7352FF 10%, #9d0184 100%)",
      };
      break;
    case "#F5C504":
      bg = {
        background: "#F5C504",
        background: "linear-gradient(90deg, #F5C504 10%, #ec7700 100%)",
      };
      break;
  }

  return (
    <div className="w-screen h-full min-h-screen flex p-10" style={bg}>
      {children}
    </div>
  );
};

export const RestoreView = () => {
  const router = useRouter();
  const { token } = router.query;

  const { handlePreloader } = usePreloaderContext();
  const [validation, setValidation] = useState(false);
  const [back, setBack] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const validatePassword = (password, confirm) => {
    setValidation(password === confirm);
  };

  const sendValidation = () => {
    return (
      !validation &&
      !errors?.confirm &&
      !errors?.password &&
      watch("password") &&
      watch("confirm")
    );
  };

  const onSubmit = (data) => {
    if (!validation) {
      toast.error("Tu password no coincide", { theme: "colored" });
      return false;
    }
    handlePreloader(true);
    handleRestore(data, token, "POST")
      .then((response) => {
        return response;
      })
      .then((resolve) => {
        if (resolve.ok) {
          toast.success("Datos Actualizado Exitosamente", {
            theme: "colored",
          });
          setBack(true);
        } else {
          toast.error(resolve.msg, {
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

  return (
    <Background>
      <container className="w-full bg-main-bg rounded-xl flex overflow-hidden dark:bg-main-dark-bg">
        <div className="hidden md:flex w-5/12 h-full bg-secondary-bg dark:bg-secondary-dark-bg items-center justify-center relative">
          <div className="w-48 my-0 mx-auto">
            <Image
              src="/svg/war-logo.svg"
              layout="responsive"
              width={50}
              height={47}
              href="war-logo"
            />
          </div>
        </div>

        <div className="flex justify-center items-center w-full md:w-7/12 p-8">
          <div className="text-start w-full max-w-3xl mx-auto mt-10">
            <MainTitle
              title="Restablece tu contraseña"
              subtitle="De forma rapida y segura"
              size="2xl"
            />
            <div className="text-base mt-4 text-gray-400 max-w-xl">
              Escribe tu nueva contraseña para que ingreses al sistema y puedas
              visualizar los datos de tu mascota.
            </div>

            {back ? (
              <>
                <p className="text-gray-400 dark:text-gray-100 text-sm py-4 px-5">
                  Ya has
                  <span className="ml-1 text-gray-900 font-bold">
                    Restablecido tu contraseña
                  </span>
                </p>
                <p className="text-gray-400 dark:text-gray-100 text-sm py-4 px-5">
                  Si no puedes iniciar vuelve ha solicitarlo,
                  <span
                    className="ml-1 text-cyan-500 cursor-pointer"
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    Iniciar Sesión.
                  </span>
                </p>
              </>
            ) : (
              <div className="flex flex-col w-full max-w-md px-4 mt-10 py-8 bg-white rounded-lg shadow dark:bg-gray-900 sm:px-6 md:px-8 lg:px-10 m-auto">
                <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                  Restablecer contraseña
                </div>
                <div className="mt-8">
                  <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col mb-6">
                      <div className="flex relative ">
                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-zinc-300 text-gray-500 shadow-sm text-sm dark:bg-slate-700 dark:text-white">
                          <IoIosLock />
                        </span>
                        <input
                          {...register("password", {
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                            minLength: {
                              value: 6,
                              message: "Mínimo 6 carácteres",
                            },
                            maxLength: {
                              value: 15,
                              message: "Máxima 15 carácteres",
                            },
                            pattern: {
                              value: regexText,
                              message: "Formato incorrecto",
                            },
                          })}
                          type="password"
                          className=" rounded-r-lg flex-1 appearance-none border border-zinc-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring focus:border-transparent dark:bg-slate-700 dark:text-white"
                          placeholder="Nueva contraseña"
                          onBlur={() =>
                            validatePassword(
                              watch("password"),
                              watch("confirm")
                            )
                          }
                        />
                      </div>
                      {errors.password && (
                        <small className="text-red-400 ml-10">
                          {errors.password.message}
                        </small>
                      )}
                    </div>

                    {/* Confirm */}
                    <div className="flex flex-col mb-6">
                      <div className="flex relative ">
                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-zinc-300 text-gray-500 shadow-sm text-sm dark:bg-slate-700 dark:text-white">
                          <IoIosLock />
                        </span>
                        <input
                          {...register("confirm", {
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                            minLength: {
                              value: 6,
                              message: "Mínimo 6 carácteres",
                            },
                            maxLength: {
                              value: 15,
                              message: "Máxima 15 carácteres",
                            },
                            pattern: {
                              value: regexText,
                              message: "Formato incorrecto",
                            },
                          })}
                          type="password"
                          className=" rounded-r-lg flex-1 appearance-none border border-zinc-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring focus:border-transparent dark:bg-slate-700 dark:text-white"
                          placeholder="Confirmar contraseña"
                          onBlur={() =>
                            validatePassword(
                              watch("password"),
                              watch("confirm")
                            )
                          }
                        />
                      </div>
                      {errors.confirm && (
                        <small className="text-red-400 ml-10">
                          {errors.confirm.message}
                        </small>
                      )}

                      {sendValidation() && (
                        <small className="text-red-400 ml-10">
                          Las contraseñas no coinciden
                        </small>
                      )}
                    </div>

                    {/* button */}
                    <div className="flex w-full">
                      <button className="py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-cyan-500">
                        Guardar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="flex items-center text-gray-400 mt-28">
              <span
                className="text-lg mr-2 cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Ir al Login
              </span>
              <AiOutlineArrowRight />
            </div>
          </div>
        </div>
      </container>
    </Background>
  );
};
