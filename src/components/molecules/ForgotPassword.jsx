import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosLock } from "react-icons/io";
import { RiMailSendLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { usePreloaderContext } from "../../contexts";
import { objectUppercase } from "../../utils/helpers";
import { handleRecuperate } from "../../utils/war/users";
import { DefaultModal } from "./modals/DefaultModal";
import { CardInput } from "../atoms/inputs/CardInput";
import { MdEmail } from "react-icons/md";
import { DefaultButton } from "../atoms/DefaultButton";
import { useStateContext } from "../../contexts/ContextProvider";

export const ForgotPassword = ({ setOpenEdit }) => {
  const [correoEnviado, setCorreoEnviado] = useState(false);
  const { handlePreloader } = usePreloaderContext();
  const { currentColor } = useStateContext();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handlePreloader(true);
    data = objectUppercase(data);
    handleRecuperate(data, "POST")
      .then((response) => {
        return response;
      })
      .then((resolve) => {
        if (resolve.ok) {
          toast.success("Datos Actualizado Exitosamente", {
            theme: "colored",
          });
          setCorreoEnviado(true);
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

  return (
    <>
      {!correoEnviado && (
        <DefaultModal width={"24rem"} handleClose={setOpenEdit}>
          <div className="flex justify-center">
            <div
              className="rounded-full p-1.5 "
              style={{
                background: `${ currentColor }`,
                color: `${ currentColor }`,
              }}
            >
              <div className="brightness-150">
                <IoIosLock size={45} />
              </div>
            </div>
          </div>

          <div className="px-3">
            <p className="text-gray-400 dark:text-gray-100 text-sm py-4 px-5">
              Ingrese su dirección de correo electrónico registrado para
              restablecer la contraseña.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="text-start pt-5">
                <CardInput
                  type="email"
                  required={true}
                  name="Usuario"
                  placeholder="usuario@firualix.com"
                  error={errors.email}
                  icon={<MdEmail />}
                  formInput={{
                    ...register("email", {
                      required: {
                        value: true,
                        message: "Se requiere el E-mail",
                      },
                    }),
                  }}
                />
              </div>
              <DefaultButton name="enviar" type="submit" size="sm" />
            </form>
          </div>
        </DefaultModal>
      )}

      {correoEnviado && (
        <DefaultModal width={"24rem"} handleClose={setOpenEdit}>
          <div className="flex justify-center">
            <div
              className="rounded-full p-1.5 "
              style={{
                background: `${ currentColor }`,
                color: `${ currentColor }`,
              }}
            >
              <div className="brightness-150">
                <RiMailSendLine size={45} />
              </div>
            </div>
          </div>

          <div className="px-3">
            <p className="text-gray-400 dark:text-gray-100 text-sm py-4 px-5">
              Las instrucciones para restablecer su contraseña han sido enviadas
              a:
              <span className="ml-1 text-gray-900 font-bold">
                {watch("email")}
              </span>
            </p>
            <p className="text-gray-400 dark:text-gray-100 text-sm py-4 px-5">
              Si no lo has recibido,
              <span
                className="ml-1 text-cyan-500 cursor-pointer"
                style={{ color: `${ currentColor }` }}
                onClick={() => {
                  setCorreoEnviado(false);
                  setValue("email", "");
                }}
              >
                Enviar nuevamente.
              </span>
            </p>

            {/* <DefaultButton
              name="cerrar"
              type="button"
              size="sm"
              onClick={() => setOpenEdit(false)}
            /> */}
            <button
              name="cerrar"
              type="button"
              size="sm"
              style={{
                background: "#1a97f5",
                border: "none",
                color: `#fff`,
                fontSize: ".8rem",
                height: "30px",
                width: "100%",
                textAlign: "center",
                cursor: "pointer",
                borderRadius: "8px",
              }}
              onClick={() => {
                setOpenEdit(false)
              }}
            >Cerrar</button>
          </div>
        </DefaultModal>
      )}
    </>
  );
};
