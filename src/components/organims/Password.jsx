import { useContext } from "react";
import { IoIosLock } from "react-icons/io";
import { regexText } from "../../utils/validations";
import { Web3Context } from "../../contexts/Web3/Web3Context";
import { useForm } from "react-hook-form";
import { PreloaderContext } from "../../contexts/Preloader/PreloaderContext";
import { usePassword } from "../../hooks/usePassword";
import { toast } from "react-toastify";
import { PageSectionContainer } from "../containers/PageSectionContainer";
import { useStateContext } from "../../contexts/ContextProvider";

export const Password = () => {
  const { currentColor } = useStateContext();
  const { web3 } = useContext(Web3Context);
  const { handlePreloader } = useContext(PreloaderContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const { validation, validatePassword, postPasword } = usePassword();

  const sendValidation = () => {
    return (
      !validation &&
      !errors?.confirm &&
      !errors?.password &&
      watch("password") &&
      watch("confirm")
    );
  };

  const onSubmit = () => {
    if (!validation) {
      toast.error("Tu password no coincide", { theme: "colored" });
      return false;
    }
    handlePreloader(true);
    postPasword(watch("passwordOld"), watch("password"), web3.authToken)
      .then((response) => response)
      .then((response) => {
        response
          ? toast.success("Tu password cambio correctamente", {
              theme: "colored",
            })
          : toast.error("No se pudo cambiar la contraseña", {
              theme: "colored",
            });

        handlePreloader(false);
        reset();
      })
      .catch((e) => {
        console.log(e);
        toast.error("No se pudo cambiar la contraseña", { theme: "colored" });
        handlePreloader(false);
      });
  };

  return (
    <PageSectionContainer category="datos" title="cambiar contraseña">
      <section className="w-full flex items-center justify-center mt-20">
        <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-900 sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
            Genera tu nueva contraseña
          </div>
          <div className="mt-8">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              {/* New */}

              <div className="flex flex-col mb-6">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-zinc-300 text-gray-500 shadow-sm text-sm dark:bg-slate-700 dark:text-white">
                    <IoIosLock />
                  </span>
                  <input
                    {...register("passwordOld", {
                      required: {
                        value: true,
                        message: "Campo requerido",
                      },
                      minLength: { value: 6, message: "Mínimo 6 carácteres" },
                      maxLength: { value: 15, message: "Máxima 15 carácteres" },
                      pattern: {
                        value: regexText,
                        message: "Formato incorrecto",
                      },
                    })}
                    type="password"
                    className=" rounded-r-lg flex-1 appearance-none border border-zinc-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring focus:border-transparent dark:bg-slate-700 dark:text-white"
                    placeholder="Contraseña actual"
                  />
                </div>
                {errors.passwordOld && (
                  <small className="text-red-400 ml-10">
                    {errors.passwordOld.message}
                  </small>
                )}
              </div>

              <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mt-4 mb-4 border-b"></div>

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
                      minLength: { value: 6, message: "Mínimo 6 carácteres" },
                      maxLength: { value: 15, message: "Máxima 15 carácteres" },
                      pattern: {
                        value: regexText,
                        message: "Formato incorrecto",
                      },
                    })}
                    type="password"
                    className=" rounded-r-lg flex-1 appearance-none border border-zinc-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring focus:border-transparent dark:bg-slate-700 dark:text-white"
                    placeholder="Nueva contraseña"
                    onBlur={() =>
                      validatePassword(watch("password"), watch("confirm"))
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
                      minLength: { value: 6, message: "Mínimo 6 carácteres" },
                      maxLength: { value: 15, message: "Máxima 15 carácteres" },
                      pattern: {
                        value: regexText,
                        message: "Formato incorrecto",
                      },
                    })}
                    type="password"
                    className=" rounded-r-lg flex-1 appearance-none border border-zinc-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring focus:border-transparent dark:bg-slate-700 dark:text-white"
                    placeholder="Confirmar contraseña"
                    onBlur={() =>
                      validatePassword(watch("password"), watch("confirm"))
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
                    La contraseñas no coinciden
                  </small>
                )}
              </div>

              {/* button */}
              <div className="flex w-full">
                <button
                  type="submit"
                  className="py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                  style={{ background: currentColor }}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </PageSectionContainer>
  );
};
