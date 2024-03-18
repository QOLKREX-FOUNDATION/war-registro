import Link from "next/link";
import { HomeSectionContainer } from "../containers/HomeSectionContainer";
import { useStateContext } from "../../contexts/ContextProvider";
import { useWeb3Context } from "../../contexts";

export const AdopterHome = () => {
  const { currentColor } = useStateContext();
  const { web3 } = useWeb3Context();

  const bgMypet = {
    backgroundImage: `url("/img/background-mypet-card.png")`,
  };
  const bgProfile = {
    backgroundImage: `url("/img/background-profile-card.png")`,
  };
  const bgPassword = {
    backgroundImage: `url("/img/background-password-card.png")`,
  };

  return (
    <HomeSectionContainer>
      <div className="text-start w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
          <span className="block">
            {web3.rol === "admin" && "Administrador"}
            {web3.rol === "adopter" && sessionStorage.getItem("name")}
          </span>
          <span className="block" style={{ color: currentColor }}>
            Aqui podras ver los datos de tu mascota
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-7 grid-flow-row-dense mt-20">
          <Link href="/adopter/my-pet">
            <div
              className="cursor-pointer duration-300 hover:scale-105 rounded-lg shadow-xl min-h-[220px] row-span-2 bg-cover bg-no-repeat bg-center overflow-hidden saturate-50 hover:saturate-100"
              style={bgMypet}
            >
              <div className="w-full h-full flex items-center justify-center duration-500">
                <div className="capitalize text-xl md:text-5xl font-light text-white w-full py-4 md:py-6 bg-gray-800 bg-opacity-40 flex justify-center">
                  <h2 className="border-y-2 md:border-y-4 w-max px-3 py-1">
                    Ver mascota
                  </h2>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/adopter/profile">
            <div
              className="cursor-pointer duration-300 hover:scale-105 rounded-lg shadow-xl min-h-[220px] bg-cover bg-no-repeat bg-center overflow-hidden saturate-50 hover:saturate-100"
              style={bgProfile}
            >
              <div className="w-full h-full flex items-center justify-center duration-500">
                <div className="capitalize text-xl font-light text-white w-full py-4 bg-gray-800 text-center bg-opacity-40 flex justify-center">
                  <h2 className="border-y-2 w-max px-3 py-1">Ver perfil</h2>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/adopter/password">
            <div
              className="cursor-pointer duration-300 hover:scale-105 rounded-lg shadow-xl min-h-[220px] bg-cover bg-no-repeat bg-center overflow-hidden saturate-50 hover:saturate-100"
              style={bgPassword}
            >
              <div className="w-full h-full flex items-center justify-center duration-500">
                <div className="capitalize text-xl font-light text-white w-full py-4 bg-gray-800 text-center bg-opacity-40 flex justify-center">
                  <h2 className="border-y-2 w-max px-3 py-1">
                    Cambiar contraseña
                  </h2>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </HomeSectionContainer>
  );
};
