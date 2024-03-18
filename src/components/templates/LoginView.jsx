import Image from "next/image";
import { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { ForgotPassword } from "../molecules/ForgotPassword";
import { LoginAdopterForm } from "../organims/LoginAdopterForm";
import { LoginRegisterConnect } from "../organims/LoginRegisterConnect";

// const Background = () => {
//   const { currentColor } = useStateContext();

//   let bg;
//   switch (currentColor) {
//     case "#1A97F5":
//       bg = {
//         background: "#1A97F5",
//         background: "linear-gradient(90deg, #1A97F5 10%, #00a99d 100%)",
//       };
//       break;
//     case "#00CC56":
//       bg = {
//         background: "#00CC56",
//         background: "linear-gradient(90deg, #00CC56 10%, #00390c 100%)",
//       };
//       break;
//     case "#7352FF":
//       bg = {
//         background: "#7352FF",
//         background: "linear-gradient(90deg, #7352FF 10%, #9d0184 100%)",
//       };
//       break;
//     case "#F5C504":
//       bg = {
//         background: "#F5C504",
//         background: "linear-gradient(90deg, #F5C504 10%, #ec7700 100%)",
//       };
//       break;
//   }
//   return (
//     <div className="absolute w-screen h-screen flex items-auto justify-between  flex-col">
//       <div className="w-full h-12" style={bg}>
//         Hola
//       </div>
//       <div className="w-full h-12" style={bg}>
//         Chau
//       </div>
//     </div>
//   );
// };

const Background = ({ children }) => {
  const { currentColor } = useStateContext();
  return (
    <div className="w-full min-h-screen relative">
      <div className="absolute w-full h-full bg-main-bg dark:bg-main-dark-bg">
        <div className="w-full h-full flex flex-col items-between justify-between relative">
          <div className="absolute w-full h-full bg-transparent dark:backdrop-blur-lg">
            <Image src="/img/login-background3.png" layout="fill" />
          </div>
          <div
            className="w-full h-24 relative"
            style={{
              background: "transparent",
              background: `linear-gradient(0deg, transparent 0%, ${ currentColor } 100%)`,
            }}
          ></div>
          <div
            className="w-full h-24 relative"
            style={{
              background: "transparent",
              background: `linear-gradient(0deg, ${ currentColor } 0%, transparent 100%)`,
            }}
          >
            <p
              className="absolute text-gray-300 font-bold top-1/2 left-12 opacity-70 dark:text-gray-600 italic text-sm"
              style={{ textShadow: "1px 1px black", zIndex: "60" }}
            >
              Desarrollado por:{" "}
              <a
                href="https://qolkrex.foundation/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:cursor-pointer"
              >
                Qolkrex Foundation.
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bg-transparent w-full z-50 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export const LoginView = () => {
  // const isRowBased = useMediaQuery("(min-width: 768px)");
  const [openEdit, setOpenEdit] = useState(false);

  // const bg = {
  //   container: (isRowBased) => ({
  //     backgroundImage: isRowBased
  //       ? 'url("/img/login-background3.png")'
  //       : "none",
  //     backgroundPosition: "center",
  //     backgroundRepeat: "no-repeat",
  //     backgroundSize: "cover",
  //   }),
  // };

  return (
    <>
      {/* <section
        style={bg.container(isRowBased)}
        className="grid gap-32 px-5 grid-cols-1 w-screen min-h-screen py-24 relative overflow-x-hidden bg-main-bg dark:bg-main-dark-bg md:grid-cols-2"
      >
        <LoginAdopterForm setOpenEdit={setOpenEdit} />
        <LoginRegisterConnect />
        {openEdit && <ForgotPassword setOpenEdit={setOpenEdit} />}
      </section> */}

      <Background>
        <section className="grid gap-32 px-5 grid-cols-1 w-screen min-h-screen py-24 relative overflow-x-hidden bg-transparent md:grid-cols-2">
          <LoginAdopterForm setOpenEdit={setOpenEdit} />
          <LoginRegisterConnect />
          {openEdit && <ForgotPassword setOpenEdit={setOpenEdit} />}
        </section>
      </Background>
    </>
  );
};
