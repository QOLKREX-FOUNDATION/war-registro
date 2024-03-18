import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { FaKey, FaUser } from "react-icons/fa";
import { MdPets, MdNotifications } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { Web3Context } from "../../contexts/Web3/Web3Context";
import { logout } from "../../utils/war/auth";
import { useStateContext } from "../../contexts/ContextProvider";
import { IoMdClose } from "react-icons/io";
import { isModule } from "../../utils/war/permissionVerifi";
import { useEntityRegister } from "../../hooks/useEntityRegister";

const Sidebar = () => {
  const { web3, handleWeb3, handleAccount, handleToken } =
    useContext(Web3Context);
  const router = useRouter();

  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 cursor-pointer dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  const exitLink =
    "flex items-center justify-center gap-5 pt-3 pb-2.5 rounded-lg text-md text-white cursor-pointer m-2 bg-red-500 hover:bg-red-600 dark:bg-red-700 hover:dark:bg-red-800";

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const { file } = useEntityRegister();


  return (
    <>
      {/* {activeMenu && ( */}
      <>
        <div
          className="flex items-center justify-center gap-2 py-4 h-28 relative"
          style={{
            background: "transparent",
            background: `linear-gradient(0deg, transparent 1%, ${ currentColor } 100%)`,
          }}
        >
          <Link href={`/${ web3.rol }`}>
            <a>
              <div className="saturate-50 duration-300 hover:scale-105 hover:saturate-100 cursor-pointer">
                <Image
                  src="/svg/war-logo.svg"
                  layout="fixed"
                  width={90}
                  height={88}
                />
              </div>
            </a>
          </Link>
          <div className="absolute top-0 right-0">
            <div
              className="md:hidden p-2 rounded-full cursor-pointer ease-in duration-200 border border-transparent hover:drop-shadow-xl text-gray-200 dark:bg-transparent dark:hover:border-gray-600"
              onClick={handleActiveMenu}
            >
              <IoMdClose />
            </div>
          </div>
        </div>

        <div
          style={{ height: "calc(100vh - 7rem)" }}
          className="flex flex-col justify-between"
        >
          <nav className="ml-3 h-full overflow-y-auto">
            <div>
              {/* OPTIONS */}
              <div className="mt-8">
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  opciones
                </p>
                {web3.authToken && web3.rol == "adopter" && (
                  <>
                    <Link href="/adopter/my-pet">
                      <a>
                        <div
                          className={
                            (`flex items-center gap-3 cursor-pointer`,
                              router.pathname == "/adopter/my-pet"
                                ? activeLink
                                : normalLink)
                          }
                          onClick={handleCloseSideBar}
                          style={{
                            background:
                              router.pathname == "/adopter/my-pet"
                                ? currentColor
                                : "",
                          }}
                        >
                          <MdPets size={18} />
                          <span className="capitalize">ver mascota</span>
                        </div>
                      </a>
                    </Link>
                    <Link href="/adopter/notification">
                      <a>
                        <div
                          className={
                            (`flex items-center gap-3 cursor-pointer`,
                              router.pathname == "/adopter/notification"
                                ? activeLink
                                : normalLink)
                          }
                          onClick={handleCloseSideBar}
                          style={{
                            background:
                              router.pathname == "/adopter/notification"
                                ? currentColor
                                : "",
                          }}
                        >
                          <MdNotifications size={18} />
                          <span className="capitalize">Notificaciones</span>
                        </div>
                      </a>
                    </Link>
                  </>
                )}

                {web3.authToken &&
                  web3.rol == "admin" && (
                    <>
                      {/* Registered pet */}
                      <Link href="/admin/registered-pet">
                        <a>
                          <div
                            className={
                              (`flex items-center gap-3 cursor-pointer`,
                                router.pathname == "/admin/see-pet"
                                  ? activeLink
                                  : normalLink)
                            }
                            onClick={handleCloseSideBar}
                            style={{
                              background:
                                router.pathname == "/admin/see-pet"
                                  ? currentColor
                                  : "",
                            }}
                          >
                            <MdPets size={18} />
                            <span className="capitalize">
                              mascotas registradas
                            </span>
                          </div>
                        </a>
                      </Link>

                      {
                        web3.account == ("0x365665cD4D15887314E608a0E6db0A9C1C922710") &&
                        <>
                          <Link href="/admin/dashboard">
                            <a>
                              <div
                                className={
                                  (`flex items-center gap-3 cursor-pointer`,
                                    router.pathname == "/admin/see-pet"
                                      ? activeLink
                                      : normalLink)
                                }
                                onClick={handleCloseSideBar}
                                style={{
                                  background:
                                    router.pathname == "/admin/see-pet"
                                      ? currentColor
                                      : "",
                                }}
                              >
                                <MdPets size={18} />
                                <span className="capitalize">
                                  Admin pets
                                </span>
                              </div>
                            </a>
                          </Link>

                          <Link href="/admin/notification">
                            <a>
                              <div
                                className={
                                  (`flex items-center gap-3 cursor-pointer`,
                                    router.pathname == "/adopter/notification"
                                      ? activeLink
                                      : normalLink)
                                }
                                onClick={handleCloseSideBar}
                                style={{
                                  background:
                                    router.pathname == "/adopter/notification"
                                      ? currentColor
                                      : "",
                                }}
                              >
                                <MdNotifications size={18} />
                                <span className="capitalize">Notificaciones</span>
                              </div>
                            </a>
                          </Link>
                        </>
                      }
                      {
                        web3.account == ("0x11c3e8eDCEd034cFCbCF88be14Dc19cB169d9951") &&
                        <>
                          <Link href="/admin/dashboard">
                            <a>
                              <div
                                className={
                                  (`flex items-center gap-3 cursor-pointer`,
                                    router.pathname == "/admin/see-pet"
                                      ? activeLink
                                      : normalLink)
                                }
                                onClick={handleCloseSideBar}
                                style={{
                                  background:
                                    router.pathname == "/admin/see-pet"
                                      ? currentColor
                                      : "",
                                }}
                              >
                                <MdPets size={18} />
                                <span className="capitalize">
                                  Admin pets
                                </span>
                              </div>
                            </a>
                          </Link>

                          <Link href="/admin/notification">
                            <a>
                              <div
                                className={
                                  (`flex items-center gap-3 cursor-pointer`,
                                    router.pathname == "/adopter/notification"
                                      ? activeLink
                                      : normalLink)
                                }
                                onClick={handleCloseSideBar}
                                style={{
                                  background:
                                    router.pathname == "/adopter/notification"
                                      ? currentColor
                                      : "",
                                }}
                              >
                                <MdNotifications size={18} />
                                <span className="capitalize">Notificaciones</span>
                              </div>
                            </a>
                          </Link>
                        </>
                      }


                      {/* New registry */}
                      {/* <Link href="/admin/registry">
												<a>
													<div
														className={
															(`flex items-center gap-3 cursor-pointer`,
															router.pathname == "/admin/registry"
																? activeLink
																: normalLink)
														}
														onClick={handleCloseSideBar}
														style={{
															background:
																router.pathname == "/admin/registry"
																	? currentColor
																	: "",
														}}
													>
														<BsFillFileEarmarkPlusFill size={18} />
														<span className="capitalize">nuevo registro</span>
													</div>
												</a>
											</Link> */}
                    </>
                  )}
              </div>

              <hr />

              {/* DATES OPTIONS*/}
              <div className="mt-8">
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  datos
                </p>

                {/* Profile*/}
                {web3.rol == 'adopter' &&
                  <Link href={`/adopter/profile`}>
                    <a>
                      <div
                        className={
                          (`flex items-center gap-3 cursor-pointer`,
                            router.pathname == `/${ web3.rol }/profile`
                              ? activeLink
                              : normalLink)
                        }
                        onClick={handleCloseSideBar}
                        style={{
                          background:
                            router.pathname == `/${ web3.rol }/profile`
                              ? currentColor
                              : "",
                        }}
                      >
                        <FaUser size={16} />
                        <span className="capitalize">ver perfil</span>
                      </div>
                    </a>
                  </Link>
                }
                {web3.rol == 'admin' &&
                  <Link href={`/admin/profile`}>
                    <a>
                      <div
                        className={
                          (`flex items-center gap-3 cursor-pointer`,
                            router.pathname == `/${ web3.rol }/profile`
                              ? activeLink
                              : normalLink)
                        }
                        onClick={handleCloseSideBar}
                        style={{
                          background:
                            router.pathname == `/${ web3.rol }/profile`
                              ? currentColor
                              : "",
                        }}
                      >
                        <FaUser size={16} />
                        <span className="capitalize">ver perfil</span>
                      </div>
                    </a>
                  </Link>
                }

                {web3.authToken && web3.rol == "adopter" && (
                  <>
                    {/* Password */}
                    <Link href="/adopter/password">
                      <a>
                        <div
                          className={
                            (`flex items-center gap-3 cursor-pointer`,
                              router.pathname == "/adopter/password"
                                ? activeLink
                                : normalLink)
                          }
                          onClick={handleCloseSideBar}
                          style={{
                            background:
                              router.pathname == "/adopter/password"
                                ? currentColor
                                : "",
                          }}
                        >
                          <FaKey />
                          <span className="capitalize">
                            cambiar contraseña
                          </span>
                        </div>
                      </a>
                    </Link>
                  </>
                )}
              </div>

              <hr />
            </div>
          </nav>

          {/* EXIT */}
          <div
            className="pt-7 pb-3"
            style={{
              boxShadow: "0px -4px 6px -1px rgb(0 0 0 / 0.1)", // negative shadow-md
            }}
          >
            <div className="flex items-center justify-between pl-12 pr-12 mb-5">
              <div className="border-r-2 dark:border-gray-600">
                <p className="leading-3 font-thin text-xs text-gray-400 dark:text-gray-500">
                  Entidad registradora
                </p>
              </div>
              <div className="w-28 ml-4">
                <img
                  // src={
                  //   web3.rol == "adopter"
                  //     ? `https://firulaixcoin.finance/images/logos/${ sessionStorage.getItem(
                  //       "idEntity"
                  //     ) }.png`
                  //     : !!web3.account && `https://firulaixcoin.finance/images/logos/${ sessionStorage.getItem(
                  //       "idEntity_" + String(web3.account).toUpperCase()
                  //     ) }.png`
                  // }
                  src={file}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = `/img/logo/q-pet-logo1.png`;
                  }}
                />
              </div>
            </div>

            <div
              className={(`flex items-center gap-3 cursor-pointer`, exitLink)}
              onClick={() => {
                logout(web3, handleWeb3, handleToken, handleAccount);
                router.push(`/login`);
              }}
            >
              <ImExit size={18} />
              <span className="capitalize">Cerrar Sesión</span>
            </div>

            <div className="text-center">
              <small className="text-gray-400 dark:text-gray-500">
                v1.0.0
              </small>
            </div>
          </div>
        </div>
      </>
      {/* )} */}
    </>
  );
};

export default Sidebar;
