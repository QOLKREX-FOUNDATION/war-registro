import {
  FcSurvey,
  FcViewDetails,
  FcKindle,
  FcFlowChart,
  FcRefresh,
} from "react-icons/fc";
import {} from "react-icons/fc";
import { AiFillTool } from "react-icons/ai";
import { usePetData } from "./hook/usePetData";
import { ProfileInput } from "../../../../atoms/Form/ProfileInput";
import { useStateContext } from "../../../../../contexts/ContextProvider";
import { statusSelect } from "../PetsData/status";
import { useColours } from "../../../Cpanel/components/PetForm/hooks/useColours";
import { ReactSelect } from "../../../../atoms/Form";
import { useSpecie } from "../../../Cpanel/components/PetForm/hooks/useSpecie";
import { formatDate } from "../../../../../utils/date";
import { API, URL_WAR } from "../../../../../config";
import { useCountry } from "../../../../../hooks/useCountry";
import { entityId } from "../../../../../config/constants/entity";
import QRCode from "react-qr-code";
import { useContext, useEffect, useRef, useState } from "react";
import { downloadImage } from "../../../../../utils/download";
import { optionsSterilized } from "../../../Cpanel/components/PetForm/utils/Data";
import { ViewVaccines } from "../../../../molecules/Vaccines/ViewVaccines";
import { imageURI } from "../../../../../config/constants/endpoints";
import { useToken } from "../../../../../hooks/useToken";
import { Web3Context } from "../../../../../contexts/Web3/Web3Context";
import { useWeb3Context } from "../../../../../contexts";
import { toast } from "react-toastify";
import { PreloaderContext } from "../../../../../contexts/Preloader/PreloaderContext";
import { setStatus } from "../../../../../utils/war/bridge";
import { handlePostStatus } from "../../../../../utils/war/pets";
import { useForm } from "react-hook-form";
import { TreeSection } from "./TreeSection";

const ANIMALS = {
  DOG: {
    name: "Perro",
    address: "0x1b38F24AFfa9783f8b706F26B59235213385BF13",
  },
  CAT: {
    name: "Gato",
    address: "0xc51F5c53E693DdF3Fe1849c4716D320D8082cd2E",
  },
  BIRD: {
    name: "Ave",
    address: "0x1b38F24AFfa9783f8b706F26B59235213385BF13",
  },
  RABBIT: {
    name: "Conejo",
    address: "0x1b38F24AFfa9783f8b706F26B59235213385BF13",
  },
  HAMSTER: {
    name: "Hamster",
    address: "0x1b38F24AFfa9783f8b706F26B59235213385BF13",
  },
  OTHER: {
    name: "Otro",
    address: "0x1b38F24AFfa9783f8b706F26B59235213385BF13",
  },
};

export const PetData = ({ onePet, changePet }) => {
  const { currentColor } = useStateContext();
  const { species, races } = useSpecie(onePet.type);
  const { colours } = useColours();
  const { countries } = useCountry();
  const { handlePreloader } = useContext(PreloaderContext);
  const ref1 = useRef(null);

  const { web3 } = useContext(Web3Context);
  console.log(web3);

  console.log("onePet", onePet);
  // const [stateNew, setStateNew] = useState(statusSelect["es-Es"][onePet.status]);
  const { register, watch, setValue } = useForm({
    defaultValues: { status: onePet.status },
  });

  const handleStatus = () => {
    handlePreloader(true);
    setStatus(web3.wallet, web3.account, onePet.chip, watch("status"))
      .then((response) => {
        if (response?.transactionHash) {
          console.log(response);
          handlePostStatus(
            {
              chip: onePet.chip,
              status: watch("status"),
              address: web3.account,
            },
            web3.authToken
          )
            .then(() => {
              handleGetRecords({
                id: sessionStorage.getItem(
                  "idsEntity_" + String(web3.account).toUpperCase()
                ),
                // id: sessionStorage.getItem(
                // 	"idEntity_" + String(web3.account).toUpperCase()
                // ),
                token: web3.authToken,
              });
              handlePreloader(false);
              handleClose(false);
            })
            .catch((e) => {
              console.log(e);
              handlePreloader(false);
            });
        } else {
          handlePreloader(false);
        }
      })
      .catch((e) => {
        console.log(e);
        handlePreloader(false);
      });
  };

  const download = () => {
    downloadImage(ref1, "qr.jpeg", 400, 400, 1);
  };

  const race = () => {
    let temp = races.filter((values) => values.value == onePet.race);
    return temp[0]?.label;
  };

  const country = () => {
    let temp = countries.filter((values) => values.value == onePet.country);
    return temp[0]?.label;
  };

  const cardActive = {
    background: `${currentColor}60`,
  };

  const {
    dataSectionActive,
    vaccineSectionActive,
    historySectionActive,
    treeSectionActive,
    showStatus,
    onDataSection,
    onVaccineSection,
    onHistorySection,
    onTreeSection,
    onShowStatus,
  } = usePetData();

  // const { web3 } = useWeb3Context();
  const { token, getToken } = useToken();

  useEffect(() => {
    getToken(web3, onePet.chip);
  }, []);

  // console.log("onePet", onePet);

  const copyToken = () => {
    navigator.clipboard.writeText(token);
    toast.success("Token copiado");
  };

  const copySmartContract = () => {
    const { address } = ANIMALS[onePet.type];

    navigator.clipboard.writeText(address);
    toast.success("Contrato copiado");
  };

  return (
    <>
      <div className="flex flex-col flex-wrap md:grid grid-cols-2 gap-x-12 grid-flow-row-dense mt-20 z-10">
        <div className="">
          <div className="overflow-hidden shadow-lg rounded-lg relative mb-6 w-80  max-w-[300px]">
            <img
              // src={`${API.warPublic}public/images/image/${
              // 	onePet.chip
              // }.jpg?${Math.random()}`}
              src={`${imageURI}/${onePet.chip}.png`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = `/img/error/${onePet.type}.png`;
              }}
              className="rounded-lg object-cover w-full max-w-[300px]"
            />
            <div className="absolute bg-gradient-to-b bg-opacity-60 from-transparent to-black w-full p-4 bottom-0 ">
              <div className="flex items-center">
                <div className="text-white text-3xl mb-2">{onePet.name}</div>
                <div
                  className={`w-4 h-4  rounded-full ml-2
                      ${onePet.status == "ACTIVE" && "bg-green-500"}
                      ${onePet.status == "ADOPTION" && "bg-blue-500"}
                      ${onePet.status == "GALLERY" && "bg-blue-200"}
                      ${onePet.status == "LOST" && "bg-yellow-500"}
                      ${onePet.status == "STOLEN" && "bg-red-500"}
                      ${onePet.status == "DEAD" && "bg-black-500"}
                      rounded-full`}
                ></div>
                <small
                  className={`ml-1 
									${onePet.status == "ACTIVE" && "text-green-500"}
									${onePet.status == "ADOPTION" && "text-blue-500"}
									${onePet.status == "GALLERY" && "text-green-200"}
									${onePet.status == "LOST" && "text-yellow-500"}
									${onePet.status == "STOLEN" && "text-red-500"}
									${onePet.status == "DEAD" && "text-black-500"}
								  `}
                  style={{ textShadow: "1px 1px black" }}
                >
                  {statusSelect["es-Es"][onePet.status]}
                </small>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-300 flex items-center text-xs">
                  {onePet.adopter}
                </p>
              </div>
              <div className="w-2/4 mt-4">
                <a
                  href={`${URL_WAR}/validate/${Buffer.from(
                    onePet.chip
                  ).toString("base64")}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="py-2 px-4  bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 focus:ring-offset-cyan-500 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Visualizar NFT
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 xl:grid-cols-4 xl:h-auto items-center justify-center">
          <div
            className="shadow-lg rounded-2xl p-4 text-gray-800 dark:text-gray-50 duration-300 cursor-pointer hover:scale-95"
            style={dataSectionActive ? cardActive : null}
            onClick={onDataSection}
          >
            <div className="flex items-center">
              <p className="text-xs ml-2 mb-4 capitalize">datos generales</p>
            </div>
            <div className="flex justify-center">
              <FcSurvey size={55} />
            </div>
          </div>

          <div
            className="shadow-lg rounded-2xl p-4 text-gray-800 dark:text-gray-50 duration-300 cursor-pointer hover:scale-95"
            style={vaccineSectionActive ? cardActive : null}
            onClick={onVaccineSection}
          >
            <div className="flex items-center">
              <p className="text-xs ml-2 mb-4 capitalize">lista de vacunas</p>
            </div>
            <div className="flex justify-center">
              <FcViewDetails size={55} />
            </div>
          </div>

          <div
            className="shadow-lg rounded-2xl p-4 text-gray-800 dark:text-gray-50 duration-300 cursor-pointer hover:scale-95"
            style={historySectionActive ? cardActive : null}
            onClick={onHistorySection}
          >
            <div className="flex items-center">
              <p className="text-xs ml-2 mb-4 capitalize">historial clinico</p>
            </div>
            <div className="flex justify-center">
              <FcKindle size={55} />
            </div>
          </div>

          <div
            className="shadow-lg rounded-2xl p-4 text-gray-800 dark:text-gray-50 duration-300 cursor-pointer hover:scale-95"
            style={treeSectionActive ? cardActive : null}
            onClick={onTreeSection}
          >
            <div className="flex items-center">
              <p className="text-xs ml-2 mb-4 capitalize">arbol genealógico</p>
            </div>
            <div className="flex justify-center">
              <FcFlowChart size={55} />
            </div>
          </div>

          {/* <div
						className="shadow-lg rounded-2xl p-4 text-gray-800 dark:text-gray-50 duration-300 cursor-pointer hover:scale-95"
						style={showStatus ? cardActive : null}
						onClick={onShowStatus}
					>
						<div className="flex items-center">
							<p className="text-xs ml-2 mb-4 capitalize">Cambiar el Estado de Mi Mascota</p>
						</div>
						<div className="flex justify-center">
							<FcRefresh size={55} />
						</div>
					</div> */}
        </div>
      </div>

      {dataSectionActive && (
        <>
          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mt-14 mb-10 border-b">
            <h4 className="text-lg text-gray-400 dark:text-gray-400 mt-4 mb-4 uppercase">
              Datos generales
            </h4>
          </div>

          {/* TOKEN */}
          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
            <div className="flex items-center border-b">
              <h5
                className="text-base capitalize font-semibold"
                style={{ color: currentColor }}
              >
                Token
              </h5>
            </div>

            <div className="col-span-2 flex justify-between">
              <div className="w-1/2 col-span-2 dark:text-white flex items-center justify-between px-4 py-1 border rounded-lg dark:bg-gray-700">
                <h2>{token ? token : "No se ha generado el token"}</h2>

                <button
                  className="bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 focus:ring-offset-cyan-500 text-white w-10 flex justify-center items-center py-2 transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  title="Copiar token"
                  onClick={copyToken}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                    />
                  </svg>
                </button>
              </div>

              <h2 className="text-sky-500 text-3xl font-bold">
                {ANIMALS[onePet.type].name}
              </h2>
            </div>
          </div>

          {/* REGISTERED */}
          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
            <div className="flex items-center border-b">
              <h5
                className="text-base capitalize font-semibold"
                style={{ color: currentColor }}
              >
                Registrado por
              </h5>
            </div>

            <div className="col-span-2">
              <ProfileInput
                value={entityId[onePet.idRegisteringEntity] ?? entityId[1]}
              />
            </div>
          </div>

          {/* MICROCHIP*/}
          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
            <div className="flex items-center border-b">
              <h5
                className="text-base capitalize font-semibold"
                style={{ color: currentColor }}
              >
                Microchip
              </h5>
            </div>

            <div className="col-span-2">
              <ProfileInput value={onePet.chip} />
            </div>
          </div>

          {/* COUNTRY*/}
          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
            <div className="flex items-center border-b">
              <h5
                className="text-base capitalize font-semibold"
                style={{ color: currentColor }}
              >
                País
              </h5>
            </div>

            <div className="col-span-2">
              <ProfileInput value={country()} />
            </div>
          </div>

          {/* BIRTH*/}
          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
            <div className="flex items-center border-b">
              <h5
                className="text-base capitalize font-semibold"
                style={{ color: currentColor }}
              >
                Cumpleaños
              </h5>
            </div>

            <div className="col-span-2">
              <ProfileInput value={formatDate(onePet.date)} />
            </div>
          </div>

          {/* DATE OF ADOPTION*/}
          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
            <div className="flex items-center border-b">
              <h5
                className="text-base capitalize font-semibold"
                style={{ color: currentColor }}
              >
                Datos de adopcion
              </h5>
            </div>

            <div className="col-span-2">
              <ProfileInput value={formatDate(onePet.dateAdoption)} />
            </div>
          </div>

          {/* GENDER*/}
          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
            <div className="flex items-center border-b">
              <h5
                className="text-base capitalize font-semibold"
                style={{ color: currentColor }}
              >
                Sexo
              </h5>
            </div>

            <div className="col-span-2">
              <ProfileInput
                value={`${onePet.gender === "MALE" ? "MACHO" : ""}${
                  onePet.gender === "FEMALE" ? "HEMBRA" : ""
                }`}
              />
            </div>
          </div>

          {/* RACE*/}
          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
            <div className="flex items-center border-b">
              <h5
                className="text-base capitalize font-semibold"
                style={{ color: currentColor }}
              >
                Raza
              </h5>
            </div>

            <div className="col-span-2">
              <ProfileInput value={race()} />
            </div>
          </div>
          {/* COLOR*/}
          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
            <div className="flex items-center border-b">
              <h5
                className="text-base capitalize font-semibold"
                style={{ color: currentColor }}
              >
                Colores
              </h5>
            </div>

            <div className="col-span-2">
              <ReactSelect
                isMulti={true}
                options={colours}
                value={colours.filter((color) =>
                  onePet.colour.split(",").includes(color.value)
                )}
                readOnly={true}
              />
            </div>
          </div>

          {/* STERILIZED*/}
          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
            <div className="flex items-center border-b">
              <h5
                className="text-base capitalize font-semibold"
                style={{ color: currentColor }}
              >
                Estelirizado
              </h5>
            </div>

            <div className="col-span-2">
              <ProfileInput
                value={
                  optionsSterilized.filter(
                    (option) => option.value === onePet?.sterilized
                  )[0]?.label
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
            <div className="flex items-center border-b">
              <h5
                className="text-base capitalize font-semibold"
                style={{ color: currentColor }}
              >
                Imagen del codigo QR para verificar Mascota en la BLOCKCHAIN
              </h5>
            </div>
            <div className="col-span-2">
              <div className="w-2/4">
                <button
                  onClick={download}
                  type="submit"
                  className="py-2 px-4  bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 focus:ring-offset-cyan-500 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Descargar
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              overflow: "hidden",
              height: "0",
            }}
          >
            <div
              ref={ref1}
              style={{
                display: "block",
                height: "400px",
                width: "400px",
              }}
            >
              <QRCode
                value={`${URL_WAR}/validate/${Buffer.from(onePet.chip).toString(
                  "base64"
                )}`}
                size={400}
              />
            </div>
          </div>
        </>
      )}

      {vaccineSectionActive && (
        <>
          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mt-14 mb-10 border-b">
            <h4 className="text-lg text-gray-400 dark:text-gray-400 mt-4 mb-4 uppercase">
              Lista de vacunas
            </h4>
          </div>
          <ViewVaccines pets={onePet} />
        </>
      )}

      {historySectionActive && (
        <>
          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mt-14 mb-10 border-b">
            <h4 className="text-lg text-gray-400 dark:text-gray-400 mt-4 mb-4 uppercase">
              Historial Clinico
            </h4>
          </div>
          <div className="flex items-center justify-center mt-20 mb-20">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-400 dark:text-white sm:text-4xl">
                Proximamente
              </h2>
              <div className="flex items-center flex-col text-gray-400 gap-2">
                <p className="text-xl">
                  Estamos trabajando para darte nuevas funcionalidades.
                </p>
                <div className="flex justify-center mt-5">
                  <lord-icon
                    src="https://cdn.lordicon.com/sbiheqdr.json"
                    trigger="loop"
                    style={{ width: "150px", height: "150px" }}
                    colors="primary:#9ca3af,secondary:#9ca3af"
                  ></lord-icon>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {treeSectionActive && (
        <>
          <TreeSection chip={onePet.chip} />
          {/* <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mt-14 mb-10 border-b">
							<h4 className="text-lg text-gray-400 dark:text-gray-400 mt-4 mb-4 uppercase">
								Arbol genealogico
							</h4>
						</div>
						<div className="flex items-center justify-center mt-20 mb-20">
							<div>
								<h2 className="text-3xl font-extrabold text-gray-400 dark:text-white sm:text-4xl">
									Proximamente
								</h2>
								<div className="flex items-center flex-col text-gray-400 gap-2">
									<p className="text-xl">
										Estamos trabajando para darte nuevas funcionalidades.
									</p>
									<div className="flex justify-center mt-5">
										<lord-icon
											src="https://cdn.lordicon.com/sbiheqdr.json"
											trigger="loop"
											style={{ width: "150px", height: "150px" }}
											colors="primary:#9ca3af,secondary:#9ca3af"
										></lord-icon>
									</div>
								</div>
							</div>
						</div> */}
        </>
      )}

      {showStatus && (
        <>
          <div className="flex flex-col mt-14 mb-10 border-b max-w-xl dark:bg-gray-700 px-10 py-10 rounded-xl">
            <h4 className="text-lg text-gray-400 dark:text-gray-400 mt-4 mb-4 uppercase">
              Elija el estado de su mascota
            </h4>
            <p className="dark:text-white">
              Usted tiene la potestad de cambiar el estado de su mascota en
              cualquier momento, acontinuación se presenta una descripción de
              cada estado.
            </p>
            <div className="flex flex-col gap-2 mb-5 dark:text-white">
              <p className="">
                <span className="font-bold mr-2">-Activo:</span>
                EI animal se encuentra en perfectas condiciones.
              </p>
              <p className="">
                <span className="font-bold mr-2">-En Adopcion:</span>
                Permites que la entidad registradora correspondiente transfiera
                al animal a un nuevo adopten
              </p>
              <p className="">
                <span className="font-bold mr-2">-En Galería:</span>
                EI animal podrá ser vizualizado en los albergues para que se
                comuniquen con usted.
              </p>
              <p className="">
                <span className="font-bold mr-2">-Extraviado:</span>
                Proceda si el animal se encuentra perdido.
              </p>
              <p className="">
                <span className="font-bold mr-2">-Robado:</span>
                Proceda si considera que eI animal fue raptado
              </p>
              <p className="">
                <span className="font-bold mr-2">-Deceso:</span>
                Si el animal carece de vida activar esta opción.
              </p>
              <p className="">
                De no poder cambiar el estado de su mascota, por favor
                comuniquese con nosotros.
              </p>
            </div>

            <div className="col-span-2">
              <ReactSelect
                options={Object.keys(statusSelect["es-Es"]).map((key) => ({
                  value: key,
                  label: statusSelect["es-Es"][key],
                }))}
                value={{ label: watch("status"), value: watch("status") }}
                onChange={(target) => {
                  console.log(target);
                  setValue("status", target.value);
                }}
              />
              <button
                onClick={() => {
                  handleStatus();
                }}
                type="submit"
                className="py-2 px-4  bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 focus:ring-offset-cyan-500 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mt-5"
              >
                Actualizar
              </button>
            </div>
          </div>
          {/* <ViewVaccines pets={onePet} /> */}
        </>
      )}

      <>
        <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mt-14 mb-10 border-b">
          <h4 className="text-lg text-gray-400 dark:text-gray-400 mt-4 mb-4 uppercase">
            Recomendación
          </h4>
        </div>
        {/* address perro o gato u otro*/}
        <div className="flex flex-col md:grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
          <div className="flex items-center border-b">
            <h5
              className="text-base font-semibold"
              style={{ color: currentColor }}
            >
              Si deseas importar la identidad digital de tu mascota al{" "}
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-500 hover:text-cyan-600"
              >
                Metamask
              </a>
              , aquí está el contrato inteligente
            </h5>
          </div>

          <div className="col-span-2 flex justify-between ">
            <div className="max-w-lg col-span-2 dark:text-white flex items-center justify-between px-4 py-1 border rounded-lg dark:bg-gray-700">
              <h2 className="text-sm md:text-lg lg:text-xl max-w-[200px] md:max-w-md overflow-x-auto md:overflow-auto md:w-full flex">
                {ANIMALS[onePet.type].address}
              </h2>

              <button
                className="bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 focus:ring-offset-cyan-500 text-white w-10 flex justify-center items-center py-2 transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                title="Copiar token"
                onClick={copySmartContract}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
};
