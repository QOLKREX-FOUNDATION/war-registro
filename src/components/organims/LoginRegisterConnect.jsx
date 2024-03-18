import React, { useState } from "react";
import { ConnectButton } from "../atoms/ConnectButton";
import { MainTitle } from "../atoms/MainTitle";
import { CardContainer } from "../containers/CardContainer";

export const LoginRegisterConnect = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <MainTitle
          title="Entidades registradoras y/o usuarios autorizados..."
          subtitle="Es momento de registrar!"
          size="2xl"
        />
        <div className="text-base mt-4 text-gray-400">
          Para empezar a registrar sigue estos 02 sencillos pasos:
          <ol className="list-decimal mx-8 mt-2">
            <li>
              Iniciar sesion con tu cuenta de <b>Metamask</b>.
            </li>
            <li>
              Darle click al boton <b>Autenticarse</b> para ingresar a la
              plataforma.
            </li>
          </ol>
        </div>
      </div>

      <div className="mt-20">
        <CardContainer>
          <section className="p-3">
            <img
              alt="moto"
              src="/svg/metamask-logo.svg"
              className="absolute -right-20 -bottom-8 h-40 w-40 mb-4"
            />
            <div className="w-4/6">
              <p className="text-amber-600 text-lg font-medium mb-2">
                Metamask
              </p>
              <p className="text-gray-400 text-xs">
                Inicia sesion con Metamask para obtener acceso a la plataforma
                de registro.
              </p>
              <div className="mt-3">
                <ConnectButton setOpen={setOpen} open={open} />
              </div>
            </div>
          </section>
        </CardContainer>
      </div>
    </div>
  );
};
