import React, { useContext } from "react";
import Image from "next/image";
import { useLogin } from "../../hooks/useLogin";
import { Web3Context } from "../../contexts/Web3/Web3Context";
import { useStateContext } from "../../contexts/ContextProvider";
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { DefaultButton } from "../atoms/DefaultButton";
import { CardInput } from "../atoms/inputs/CardInput";
import { CardForm } from "../molecules/cards/CardForm";

export const LoginAdopterForm = ({ setOpenEdit }) => {
  const { handleToken } = useContext(Web3Context);
  const { currentColor } = useStateContext();
  const { email, password, setEmail, setPassword, onLogin } = useLogin();

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <CardForm title={"Bienvenido! Ingrese sus datos"}>
          <form
            action="#"
            autoComplete="off"
            onSubmit={(e) => onLogin(e, handleToken)}
          >
            <CardInput
              icon={<MdEmail />}
              id="email"
              type="email"
              placeholder="usuario@firualix.com"
              formInput={{
                onChange: ({ target }) => setEmail(target.value),
              }}
            />
            <CardInput
              icon={<IoIosLock />}
              id="password"
              type="password"
              placeholder="••••••••"
              formInput={{
                onChange: ({ target }) => {
                  // console.log(target.value)
                  setPassword(target.value)
                },
              }}
            />
            <p
              className="text-xs font-thin duration-200 cursor-pointer text-end dark:text-gray-100"
              onClick={() => setOpenEdit(true)}
            >
              ¿Olvidaste tu contraseña?
            </p>
            <div className="mt-5">
              <DefaultButton name="ingresar" type="submit" size="sm" />
            </div>
          </form>
        </CardForm>

        <div className="mt-14 w-full">
          {/* <p
            className="font-extrabold text-sm text-center"
            style={{ color: currentColor }}
          >
            Desarrollado por:
          </p> */}
          <div className="grid grid-cols-2 items-center">
            <div className="w-32 my-0 mx-auto transition duration-300 ease-in-out saturate-50 hover:saturate-100 hover:scale-105 cursor-pointer">
              <a
                href="https://worldanimalregistry.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/svg/war-logo.svg"
                  layout="responsive"
                  width={50}
                  height={47}
                  href="war-logo"
                />
              </a>
            </div>
            <div className="w-32 my-0 mx-auto transition duration-300 ease-in-out saturate-50 hover:saturate-100 hover:scale-105 cursor-pointer">
              <a
                href="https://firulaixcoin.finance/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/svg/firulaix-logo.svg"
                  layout="responsive"
                  width={120}
                  height={30}
                  href="firulaix-logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
