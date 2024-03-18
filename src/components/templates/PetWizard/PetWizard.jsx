import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePrice } from "../../../hooks/usePrice";
import { Chip } from "../../atoms/Chip/Chip";
import { ChipDate } from "../../atoms/Chip/ChipDate";
import { Step } from "../../atoms/Step/Step";
import { StepButtons } from "../../atoms/Step/StepButtons";
import { Adopter } from "../../organims/Cpanel/components/Adopter/Adopter";
import { PetFinish } from "../../organims/Cpanel/components/PetFinish/PetFinish";
import { PetForm } from "../../organims/Cpanel/components/PetForm/PetForm";
import { useRegister } from "./hooks/useRegister";
import { PetButton } from "./PetButton";
import { firuApi } from "../../../../api";
import Swal from "sweetalert2";
import { useWeb3Context } from "../../../contexts";
import { useSearchForm } from "../../../hooks/useSearchForm";
import { CorrelativeContext } from "../../../contexts/CorrelativeContext";
import { useCorrelative } from "../../../hooks/useCorrelative";
import { useContext } from "react";

export const PetWizard = ({
  request,
  handleSelection,
  adopterInit,
  petInit,
  resetInit,
  update = false,
}) => {
  const {
    register: adopterValues,
    handleSubmit: handleAdopter,
    watch: watchAdopter,
    setValue: setAdopter,
    formState: { errors: errorsAdopter },
    reset: adopterReset,
  } = useForm({
    defaultValues: adopterInit,
  });

  const {
    register: petValues,
    handleSubmit: hanldePet,
    watch: watchPet,
    setValue: setPet,
    formState: { errors: errorsPet },
    reset: petReset,
    getValues: getPet,
  } = useForm({
    defaultValues: petInit,
    mode: "onBlur",
  });

  const { web3 } = useWeb3Context();

  const { coin, setCoin, price, setPrice, priceCoin, setPriceCoin } =
    usePrice();

  const { image, pedigree, handleFinish, imageFileToWeb3Storage } = useRegister(
    {
      update,
      request,
      handleSelection,
      petInit,
    }
  );

  const [wizard, setWizard] = useState(1);

  const { setCorrelativeId } = useContext(CorrelativeContext);
  const { setStatusCorrelative } = useCorrelative();

  const reset = () => {
    setWizard(1);
    resetInit();
  };

  useEffect(() => {
    petReset(petInit);
  }, [petInit]);

  useEffect(() => {
    adopterReset(adopterInit);
  }, [adopterInit]);

  useEffect(() => {
    setPet("adopter", watchAdopter("address"));
  }, [watchAdopter("address")]);

  useEffect(() => {
    setPet("adopterName", watchAdopter("name"));
  }, [watchAdopter("name")]);

  useEffect(() => {
    setPet("adopterLastName", watchAdopter("lastName"));
  }, [watchAdopter("lastName")]);

  const handleLoadData = () => {
        setAdopter("documentNumber", data.adopter.documentNumber);

    // si el document number existe solo setear los datos de la mascota

    // console.log(errorsAdopter)

    // if (errorsAdopter.documentNumber) {
    // 	console.log("no existe")
    // }

    // setAdopter("person", data.adopter.person)
    // setAdopter("type", data.adopter.adopterType)
    // setAdopter("name", data.adopter.firstName)
    // setAdopter("secondName", data.adopter.secondName)
    // setAdopter("lastName", data.adopter.firstLastName)
    // setAdopter("mLastName", data.adopter.secondLastName)
    // setAdopter("gender", data.adopter.gender === "H" ? "MAN" : "WOMAN")
    // setAdopter("date", data.createdAt)
    // setAdopter("address", data.adopter.addressPublic)
    // setAdopter("document", data.adopter.documentType)
    // setAdopter("phone", data.adopter.cellphone)
    // setAdopter("email", data.adopter.email)
    // setAdopter("country", data.adopter.country)
    // setAdopter("department", data.adopter.department)
    // setAdopter("province", data.adopter.province)
    // setAdopter("district", data.adopter.district)
    // setAdopter("direction", data.adopter.address)

    setPet("name", data.pet.firstNamePet);
    setPet("chip", data.pet.microchip);
    setPet("chipDate", data.pet.dateMicrochip);
    setPet("country", data.pet.countryPet);
    setPet("date", data.pet.birthDatePet);
    setPet("dateAdoption", data.pet.adoptionDate);
    setPet("gender", data.pet.genderPet === "M" ? "MALE" : "FEMALE");
    setPet("type", data.pet.specie);
    setPet("race", data.pet.race);
    setPet("colour", data.pet.color);
    setPet(
      "sterilized",
      data.pet.isSterilized === "isSterilized-yes" ? "YES" : "NO"
    );
    setPet("chipFather", data.pet.fatherMicrohip);
    setPet("chipMother", data.pet.motherMicrochip);
    console.log(data.imagePet.imageUrl);
    setPet("image", data.imagePet.imageUrl);
    console.log(data.correlativeNumber);
    setPet("formId", data.id);

    setCorrelativeId(data.id);
  };

  const {
    data,
    loading,
    handleSearch,
    handleSubmitSearch,
    handleCleanSearch,
    errorsSearch,
    registerSearch,
  } = useSearchForm();

  const handleDownload = async () => {
    if (data.imagePet.imageUrl === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se encontró la imagen",
        footer: "<a href>Why do I have this issue?</a>",
      });
      return;
    }

    // data.imagePet.imageUrl

    const url = data?.imagePet?.imageUrl;

    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    // fecha y hora actual para el nombre
    const date = new Date();
    const dateNow = date.toLocaleDateString();
    const timeNow = date.toLocaleTimeString();
    link.download = `${dateNow} ${timeNow}`;
    link.click();
    link.remove();
  };

  console.log(data);
  console.log(data?.imagePet?.imageUrl);
  useEffect(() => {
    if (watchAdopter("country") === "") {
      const countryER = JSON.parse(
        sessionStorage.getItem("entity_" + String(web3.account).toUpperCase())
      )?.country;
      setAdopter("country", countryER);
			localStorage.setItem("countryCode", countryER);
    }
  }, [watchAdopter("country")]);

  return (
    <>
      <form
        onSubmit={handleSubmitSearch(handleSearch)}
        className="flex flex-row gap-2 mt-5 w-1/2"
      >
        {/* input text search correlative */}
        <div className="w-full flex flex-col h-32 gap-3">
          <label
            htmlFor="searchCorrelative"
            className="font-semibold dark:text-white"
          >
            Buscar por Nro de Formulario
          </label>
          <input
            id="searchCorrelative"
            type="text"
            className="h-10 px-3 dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 w-full"
            placeholder="Buscar por Correlativo"
            {...registerSearch("search", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              minLength: {
                value: 1,
                message: "Mínimo 1 caracteres",
              },
              // maxLength: {
              // 	value: 4,
              // 	message: "Máximo 4 caracteres",
              // },
            })}
          />
          <span className="text-red-500 px-3">
            {data.status === "registered-pet" &&
              "La mascota se encuentra registrada"}
          </span>
          <span className="dark:text-white px-3">Ejemplo: 1</span>
        </div>
        {/* button search */}
        <div className="flex gap-2 mt-8">
          <button
            type="submit"
            className="w-36 h-10 py-2 px-4 flex justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 focus:ring-offset-cyan-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            <span>Buscar</span>
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="w-36 h-10 py-2 px-4 flex justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 focus:ring-offset-cyan-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            onClick={() => {
              handleCleanSearch();
            }}
          >
            <span>Limpiar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-search-off"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              strokeWidth={1.5}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M5.039 5.062a7 7 0 0 0 9.91 9.89m1.584 -2.434a7 7 0 0 0 -9.038 -9.057"></path>
              <path d="M3 3l18 18"></path>
            </svg>
          </button>
        </div>
      </form>
      {errorsSearch?.search && (
        <p className="ml-3 text-red-400 font-semibold">
          {errorsSearch?.search.message}
        </p>
      )}

      {
        // muestra los datos del formulario encontrado

        loading ? (
          <div className="flex justify-center mt-5 ">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-white"></div>
          </div>
        ) : (
          data.id && (
            <div className="flex flex-col justify-center gap-2 mt-5 dark:text-white">
              <div className="flex w-full flex-wrap gap-2">
                <div className="flex flex-col gap-2 max-w-2xl relative flex-grow-[.5]">
                  {/* triangle border */}
                  <div className="flex max-w-xl overflow-hidden relative -bottom-2">
                    <div className="w-16 overflow-hidden inline-block">
                      <div className=" h-11 w-11 border border-black dark:border-white rotate-45 transform origin-bottom-left"></div>
                    </div>
                    <div className="w-16 overflow-hidden inline-block">
                      <div className=" h-11 w-11 border border-black dark:border-white rotate-45 transform origin-bottom-left"></div>
                    </div>
                    <div className="w-16 overflow-hidden inline-block">
                      <div className=" h-11 w-11 border border-black dark:border-white rotate-45 transform origin-bottom-left"></div>
                    </div>
                    <div className="w-16 overflow-hidden inline-block">
                      <div className=" h-11 w-11 border border-black dark:border-white rotate-45 transform origin-bottom-left"></div>
                    </div>
                    <div className="w-16 overflow-hidden inline-block">
                      <div className=" h-11 w-11 border border-black dark:border-white rotate-45 transform origin-bottom-left"></div>
                    </div>
                    <div className="w-16 overflow-hidden inline-block">
                      <div className=" h-11 w-11 border border-black dark:border-white rotate-45 transform origin-bottom-left"></div>
                    </div>
                    <div className="w-16 overflow-hidden inline-block">
                      <div className=" h-11 w-11 border border-black dark:border-white rotate-45 transform origin-bottom-left"></div>
                    </div>
                    <div className="w-16 overflow-hidden inline-block">
                      <div className=" h-11 w-11 border border-black dark:border-white rotate-45 transform origin-bottom-left"></div>
                    </div>
                    <div className="w-16 overflow-hidden inline-block">
                      <div className=" h-11 w-11 border border-black dark:border-white rotate-45 transform origin-bottom-left"></div>
                    </div>
                  </div>
                  {/* form */}
                  <div className="pl-4 border border-black dark:border-white border-t-transparent dark:border-t-transparent max-w-xl">
                    <h2 className="font-semibold py-3">
                      Nro de Formulario:
                      <span className="ml-2">
                        {data.correlativeNumber.toString().padStart(4, "0")}
                      </span>
                    </h2>
                    <div className="max-h-96 h-96 overflow-y-auto ">
                      <div className="flex flex-col flex-wrap gap-4">
                        <h1 className="font-semibold">Datos del Adoptante</h1>
                        <hr />
                        <h2 className="dark:text-white">
                          <b>Nombre:</b> {data.adopter.firstName}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Segundo Nombre:</b> {data.adopter.secondName}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Primer Apellido:</b> {data.adopter.firstLastName}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Segundo Apellido:</b> {data.adopter.secondLastName}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Tipo de Persona:</b> {data.adopter.person}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Tipo:</b> {data.adopter.type}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Género:</b> {data.adopter.gender}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Fecha:</b> {data.adopter.date}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Address:</b> {data.adopter.address}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Tipo de Documento:</b> {data.adopter.document}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Número de Documento:</b>{" "}
                          {data.adopter.documentNumber}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Celular:</b> {data.adopter.phone}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Email:</b> {data.adopter.email}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>País:</b> {data.adopter.country}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Departmento:</b> {data.adopter.department}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Provincia:</b> {data.adopter.province}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Distrito:</b> {data.adopter.district}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Dirección:</b> {data.adopter.address}
                        </h2>
                        <h1 className="font-semibold">Datos de la mascota</h1>
                        <hr />
                        <h2 className="dark:text-white">
                          <b>Nombre:</b> {data.pet.firstNamePet}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Fecha del Chip:</b> {data.pet.dateMicrochip}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Microchip:</b> {data.pet.microchip}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>País:</b> {data.pet.countryPet}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Fecha de Nacimiento:</b> {data.pet.birthDatePet}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Fecha de Adopción:</b> {data.pet.adoptionDate}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Especie:</b> {data.pet.specie}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Raza:</b> {data.pet.race}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Color:</b> {data.pet.color}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Esterilizado:</b>{" "}
                          {data.pet.isSterilized === "isSterilized-yes"
                            ? "SI"
                            : "NO"}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Chip del padre:</b> {data.pet.fatherMicrohip}
                        </h2>
                        <h2 className="dark:text-white">
                          <b>Chip de la Madre:</b> {data.pet.motherMicrochip}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                {/* image */}
                <div className="flex flex-col items-center justify-center gap-2 w-60 relative flex-grow-[.5]">
                  <img
                    src={
                      data.imagePet?.imageUrl !== "" &&
                      data.imagePet?.imageUrl !== undefined
                        ? data.imagePet?.imageUrl
                        : "https://media.discordapp.net/attachments/839620709517230081/1154198085833076858/images.png"
                    }
                    alt="pet"
                    className="w-96 h-96 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://media.discordapp.net/attachments/839620709517230081/1154198085833076858/images.png";
                    }}
                  />
                  {/* button download */}
                  <div className="flex justify-center">
                    {data.imagePet?.imageUrl !== "" &&
                      data.imagePet?.imageUrl !== undefined && (
                        <button
                          onClick={handleDownload}
                          className="w-36 h-10 py-2 px-4 flex justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 focus:ring-offset-cyan-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                          <span>Descargar</span>
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
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                          </svg>
                        </button>
                      )}
                  </div>
                </div>
              </div>
              {data.status !== "registered-pet" && (
                <button
                  type="button"
                  onClick={handleLoadData}
                  className="w-56 py-3 mx-auto bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-green-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg flex justify-center gap-2"
                >
                  <span>Cargar datos</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-file-download"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth={1.5}
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                    <path d="M12 17v-6"></path>
                    <path d="M9.5 14.5l2.5 2.5l2.5 -2.5"></path>
                  </svg>
                </button>
              )}
              {/* <button
								className="w-56 py-3 mx-auto bg-red-500 hover:bg-red-600 focus:ring-red-500 focus:ring-offset-red-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg flex justify-center gap-2"
								onClick={() => {
									setStatusCorrelative("registered-pet")
								}}
							>
								Actualizar estado
							</button> */}
            </div>
          )
        )
      }

      <div className="mt-4"></div>

      <Step wizard={wizard} quantity={[1, 2, 3]} />
      {wizard === 1 && (
        <form onSubmit={handleAdopter(() => setWizard(wizard + 1))}>
          <Adopter
            adopterValues={adopterValues}
            setAdopter={setAdopter}
            watchAdopter={watchAdopter}
            adopterReset={adopterReset}
            errorsAdopter={errorsAdopter}
            update={true}
            showAddress={false}
            readOnly={true}
            search={update ? false : true}
          />
          <div className=" flex justify-center ">
            <div className="w-1/2 flex justify-center  grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4 mt-20 ">
              <StepButtons
                wizard={wizard}
                setWizard={setWizard}
                init={1}
                end={3}
                bandera={watchAdopter("address") ? true : false}
              />
            </div>
          </div>
        </form>
      )}

      {wizard === 2 && (
        <form onSubmit={hanldePet(() => setWizard(wizard + 1))}>
          <div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mt-14 mb-10 border-b">
            <h4 className="text-lg text-gray-400 dark:text-gray-400 mt-4 mb-4 uppercase">
              Identificación
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4">
            <div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-5">
              <Chip
                petValues={petValues}
                errorsPet={errorsPet}
                watchPet={watchPet}
                setPet={setPet}
                petReset={petReset}
                required={true}
                readOnly={update}
                update={update}
                name="Micro Chip"
              />
              <ChipDate
                petValues={petValues}
                errorsPet={errorsPet}
                watchPet={watchPet}
              />
            </div>
          </div>
          <PetForm
            getPet={getPet()}
            petValues={petValues}
            errorsPet={errorsPet}
            watchPet={watchPet}
            setPet={setPet}
            update={update}
          />
          <div className=" flex justify-center ">
            <div className="w-1/2 flex justify-center  grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4 mt-20 ">
              {" "}
              <StepButtons
                wizard={wizard}
                setWizard={setWizard}
                init={1}
                end={3}
                bandera={petValues.chip != "" ? true : false}
              />
            </div>
          </div>
        </form>
      )}

      {wizard === 3 && (
        <>
          <PetFinish
            getPet={getPet()}
            watchPet={watchPet}
            price={price}
            setPrice={setPrice}
            coin={coin}
            setCoin={setCoin}
            priceCoin={priceCoin}
            setPriceCoin={setPriceCoin}
            imageFileToWeb3Storage={imageFileToWeb3Storage}
            update={update}
            setPet={setPet}
          />
          <div className=" flex justify-center ">
            <div className="w-1/2 flex justify-center  grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4 mt-8 ">
              <StepButtons
                wizard={wizard}
                setWizard={setWizard}
                init={1}
                end={3}
                bandera={petValues.chip != "" ? true : false}
              />
              <PetButton
                image={image}
                pedigree={pedigree}
                handleFinish={handleFinish}
                price={price}
                coin={coin}
                priceCoin={priceCoin}
                getPet={getPet}
                watchPet={watchPet}
                reset={reset}
                update={update}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
