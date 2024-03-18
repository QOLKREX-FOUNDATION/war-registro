import { useContext } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { useRouter } from "next/router";
import { logout } from "../../utils/war/auth";
import { Web3Context } from "../../contexts/Web3/Web3Context";
import { useStateContext } from "../../contexts/ContextProvider";
import ButtonUser from "../atoms/ButtonUser";

const UserProfile = () => {
  const { currentColor, setIsClicked, initialState } = useStateContext();
  const { web3, handleWeb3, handleAccount, handleToken } =
    useContext(Web3Context);
  const router = useRouter();

  const handleProfile = () => {
    router.push(`/${ web3.rol }/profile`);
    setIsClicked(initialState);
  };

  return (
    <div className="bg-half-transparent w-screen h-screen fixed top-0 right-0 z-50">
      <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 ">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg dark:text-gray-200">
            Perfil de usuario
          </p>
          <ButtonUser
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
          />
        </div>
        <div>
          {/* Profile option */}
          <div
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
            onClick={handleProfile}
          >
            <button
              type="button"
              style={{ color: "#03C9D7", backgroundColor: "#E5FAFB" }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              <AiOutlineUser />
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">Mi perfil</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {" "}
                Configuracion de cuenta{" "}
              </p>
            </div>
          </div>
        </div>
        <div
          className="mt-5"
          onClick={() => {
            logout(web3, handleWeb3, handleToken, handleAccount);
            router.push(`/login`);
            sessionStorage.removeItem("account")
          }}
        >
          <ButtonUser
            color="white"
            bgColor={currentColor}
            text="Cerrar sesión"
            borderRadius="10px"
            width="full"
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
