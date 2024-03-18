import React, { useContext, useState, useEffect } from "react";
// import { Input, ReactSelect, Select } from '../../../../atoms/Form'
import { useCountry } from "../../../../../hooks/useCountry";
import { set, useForm, useWatch } from "react-hook-form";
import { adopterFormRegister } from "../../../../../utils/initRegister";
// import { useDocuments } from '../../../../molecules/Adopter/Search/hooks/useDocuments';
// import { useEffect } from 'react';
// import { usePerson } from '../../../../molecules/Adopter/Search/hooks/usePerson';
// import { useUbigeo } from '../../../../../hooks/useUbigeo';
import { useSpecie } from "../../../Cpanel/components/PetForm/hooks/useSpecie";
import { useColours } from "../../../Cpanel/components/PetForm/hooks/useColours";
import { Step1, Step2, Step3, Step4 } from "./Steps";
import Image from "next/image";
import { firuApi } from "../../../../../../api";
import Swal from "sweetalert2";
import { Web3Context } from "../../../../../contexts/Web3/Web3Context";
import { ButtonTop } from "../../../../atoms/ButtonTop";
import { FormSelect } from "./FormSelect";
import { useStateContext } from "../../../../../contexts/ContextProvider";
import { useRouter } from "next/router";
// import { API } from "../../../../../config";
import QRCode from "react-qr-code";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useCodePhone } from "../../../../../hooks/useCodePhone";

export const FormRegister = ({
  flex = true,
  dataRegister = {},
  getForms,
  isEdit = false,
}) => {
  const { currentMode } = useStateContext();

  const { pathname, query } = useRouter();
  const { correlative, address } = query;

  const isDark = currentMode === "Dark" ? "dark" : "light";

  // const [isClient, setIsClient] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues,
    control,
    reset,
  } = useForm({
    defaultValues: adopterFormRegister,
    mode: "onBlur",
  });

  const formDataCache = useWatch({ control });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  const { codes, getCodes } = useCodePhone();

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setIsClient(true);
  //   }
  // }, []);

  useEffect(() => {
    getCodes(100);
  }, []);

  useEffect(() => {
    const getInfoUserByAddress = async () => {
      try {
        // const response = await firuApi.get(`/entity-register/info/0x01164f28F0DB3bc26B211f5Bec653bB244CD29d3/${address}`)
        // const response = await axios.get(
        //   `http://localhost:5000/api/entity-register/info/${address}`
        // );
        const response = await firuApi.get(`entity-register/info/${address}`);
        setUserInfo(response.data.user);
        return response.data.user;
      } catch (error) {
        console.log(error);
        setUserInfo("");
      }
    };
    if (address) {
      getInfoUserByAddress().then((resp) => {
        console.log(resp?.entityRegister?.country);
        setValue(
          "country",
          resp?.entityRegister?.country ? resp?.entityRegister?.country : "PE"
        );
      });
      // setValue("country", userInfo?.entityRegister?.country);
    } 
  }, [address]);

  useEffect(() => {
    if(!address) {
      setValue("country", dataRegister.adopter?.country);
    }
  }, [address, dataRegister])
  

  // const { entitiesRegifirst} = useEntities();
  // const { persons } = usePerson();
  // const { documents, handleDocuments } = useDocuments();
  // const { types } = useType();
  const { countries } = useCountry();
  const { species, races } = useSpecie(watch("specie"));
  const { colours } = useColours();

  const { web3 } = useContext(Web3Context);

  const handleCreate = (data) => {
    setLoading(true);
    console.log(data);

    const formData = new FormData();
    formData.append("country", data.country);
    formData.append("person", data.person);
    formData.append("adopterType", data.adopterType);
    formData.append("gender", data.gender);
    formData.append("documentType", data.documentType);
    formData.append("documentNumber", data.documentNumber?.toUpperCase());
    formData.append("nationality", data.nationality);
    formData.append("phoneCode", data.phoneCode);
    formData.append("email", data.email?.toUpperCase());
    formData.append("addressPublic", data.addressPublic?.toUpperCase());
    formData.append("department", data.department);
    formData.append("province", data.province);
    formData.append("district", data.district);
    formData.append("isAddressPublic", data.isAddressPublic);
    formData.append("firstName", data.firstName?.toUpperCase());
    formData.append("secondName", data.secondName?.toUpperCase());
    formData.append("firstLastName", data.firstLastName?.toUpperCase());
    formData.append("secondLastName", data.secondLastName?.toUpperCase());
    formData.append("birthDate", data.birthDate);
    formData.append("cellphone", data.cellphone);
    formData.append("jurament1", data.jurament1);
    formData.append("isMicrochip", data.isMicrochip);
    formData.append("jurament3", data.jurament3);
    formData.append("address", data.address?.toUpperCase());
    formData.append("microchip", data.microchip?.toUpperCase());
    formData.append("dateMicrochip", data.dateMicrochip);
    formData.append("firstNamePet", data.firstNamePet?.toUpperCase());
    formData.append("specie", data.specie);
    formData.append("birthDatePet", data.birthDatePet);
    formData.append("adoptionDate", data.adoptionDate);
    formData.append("fatherMicrochip", data.fatherMicrochip?.toUpperCase());
    formData.append("motherMicrochip", data.motherMicrochip?.toUpperCase());
    formData.append("registerEntity", data.registerEntity);
    formData.append("countryPet", data.countryPet);
    formData.append("genderPet", data.genderPet);
    formData.append("race", data.race);
    formData.append("color", data.color);
    formData.append("isSterilized", data.isSterilized);
    // formData.append("isPayment", data.isPayment)
    formData.append(
      "files",
      data?.imagePet ? data?.imagePet[0] : dataRegister?.imagePet?.imageUrl
    );

    firuApi
      .post("/form", formData)
      .catch(console.error)
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.ok === false) {
          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error, por favor intente nuevamente.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
          return;
        }

        Swal.fire({
          title: "¡Gracias por registrarte!",
          text: "Tu solicitud ha sido enviada con éxito, en breve nos pondremos en contacto contigo.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        reset();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error, por favor intente nuevamente.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      });
  };

  const handleUpdate = async (data) => {
    setLoading(true);
    console.log("update", data);

    const formData = new FormData();
    formData.append("country", data.country);
    formData.append("person", data.person);
    formData.append("adopterType", data.adopterType);
    formData.append("gender", data.gender);
    formData.append("documentType", data.documentType);
    formData.append("documentNumber", data.documentNumber?.toUpperCase());
    formData.append("nationality", data.nationality);
    formData.append("phoneCode", data.phoneCode);
    formData.append("email", data.email?.toUpperCase());
    formData.append("addressPublic", data.addressPublic?.toUpperCase());
    formData.append("department", data.department);
    formData.append("province", data.province);
    formData.append("district", data.district);
    formData.append("isAddressPublic", data.isAddressPublic);
    formData.append("firstName", data.firstName?.toUpperCase());
    formData.append("secondName", data.secondName?.toUpperCase());
    formData.append("firstLastName", data.firstLastName?.toUpperCase());
    formData.append("secondLastName", data.secondLastName?.toUpperCase());
    formData.append("birthDate", data.birthDate);
    formData.append("cellphone", data.cellphone);
    formData.append("jurament1", data.jurament1);
    formData.append("isMicrochip", data.isMicrochip);
    formData.append("jurament3", data.jurament3);
    formData.append("address", data.address?.toUpperCase());
    formData.append("microchip", data.microchip?.toUpperCase());
    formData.append("dateMicrochip", data.dateMicrochip);
    formData.append("firstNamePet", data.firstNamePet?.toUpperCase());
    formData.append("specie", data.specie);
    formData.append("birthDatePet", data.birthDatePet);
    formData.append("adoptionDate", data.adoptionDate);
    formData.append("fatherMicrochip", data.fatherMicrochip?.toUpperCase());
    formData.append("motherMicrochip", data.motherMicrochip?.toUpperCase());
    formData.append("registerEntity", data.registerEntity);
    formData.append("countryPet", data.countryPet);
    formData.append("genderPet", data.genderPet);
    formData.append("race", data.race);
    formData.append("color", data.color);
    formData.append("isSterilized", data.isSterilized);
    formData.append("isPayment", data.isPayment);
    formData.append(
      "files",
      data?.imagePet ? data?.imagePet[0] : dataRegister?.imagePet?.imageUrl
    );

    firuApi
      .put(`/form/${dataRegister.id}`, formData, {
        headers: {
          "x-token": web3.authToken,
        },
      })
      .then((response) => {
        console.log(response);
        Swal.fire({
          title: "¡Gracias por registrarte Update!",
          text: "Tu solicitud ha sido enviada con éxito, en breve nos pondremos en contacto contigo.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        setLoading(false);
        getForms();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error, por favor intente nuevamente.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      });
  };

  const handleUpdateWithCorrelative = (data) => {
    setLoading(true);
    console.log("update", data);

    const formData = new FormData();
    formData.append("country", data.country);
    formData.append("person", data.person);
    formData.append("adopterType", data.adopterType);
    formData.append("gender", data.gender);
    formData.append("documentType", data.documentType);
    formData.append("documentNumber", data.documentNumber?.toUpperCase());
    formData.append("email", data.email?.toUpperCase());
    formData.append("addressPublic", data.addressPublic?.toUpperCase());
    formData.append("department", data.department);
    formData.append("province", data.province);
    formData.append("district", data.district);
    formData.append("isAddressPublic", data.isAddressPublic);
    formData.append("firstName", data.firstName?.toUpperCase());
    formData.append("secondName", data.secondName?.toUpperCase());
    formData.append("firstLastName", data.firstLastName?.toUpperCase());
    formData.append("secondLastName", data.secondLastName?.toUpperCase());
    formData.append("birthDate", data.birthDate);
    formData.append("cellphone", data.cellphone);
    formData.append("jurament1", data.jurament1);
    formData.append("isMicrochip", data.isMicrochip);
    formData.append("jurament3", data.jurament3);
    formData.append("address", data.address?.toUpperCase());
    formData.append("microchip", data.microchip?.toUpperCase());
    formData.append("dateMicrochip", data.dateMicrochip);
    formData.append("firstNamePet", data.firstNamePet?.toUpperCase());
    formData.append("specie", data.specie);
    formData.append("birthDatePet", data.birthDatePet);
    formData.append("adoptionDate", data.adoptionDate);
    formData.append("fatherMicrochip", data.fatherMicrochip?.toUpperCase());
    formData.append("motherMicrochip", data.motherMicrochip?.toUpperCase());
    formData.append("registerEntity", data.registerEntity);
    formData.append("countryPet", data.countryPet);
    formData.append("genderPet", data.genderPet);
    formData.append("race", data.race);
    formData.append("color", data.color);
    formData.append("isSterilized", data.isSterilized);
    formData.append("isPayment", data.isPayment);
    formData.append("files", data.imagePet[0]);

    firuApi
      .put(`/form/correlative/${dataRegister.id}`, formData, {
        headers: {
          "x-token": correlative,
        },
      })
      .then((response) => {
        console.log(response);
        Swal.fire({
          title: "¡Gracias por registrarte!",
          text: "Tu solicitud ha sido enviada con éxito, en breve nos pondremos en contacto contigo.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error, por favor intente nuevamente.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        setLoading(false);
      });
  };

  const onSubmit = (data) => {
    const { document, ...rest } = data;
    console.log({ rest });

    if (dataRegister.id && pathname.split("/")[2] !== "solicitud-de-registro") {
      handleUpdate(rest);
      return;
    }
    if (dataRegister.id && pathname.split("/")[2] === "solicitud-de-registro") {
      handleUpdateWithCorrelative(rest);
      return;
    }
    handleCreate(rest);
    sessionStorage.removeItem("formDataCache");
  };

  useEffect(() => {
    if (dataRegister.id || (address && codes.length > 0)) {
      console.log("cargar datos");
      console.log({ dataRegister });
      // setValue("country", dataRegister.adopter?.country);
      setValue("person", dataRegister.adopter?.person);
      setValue("documentType", dataRegister.adopter?.documentType);
      setValue("documentNumber", dataRegister.adopter?.documentNumber);
      setValue("adopterType", dataRegister.adopter?.adopterType);
      setValue(
        "nationality",
        codes.find((code) => code.countryCode === dataRegister.adopter?.country)
          ?.id
      );
      setValue(
        "phoneCode",
        codes.find((code) => code.countryCode === dataRegister.adopter?.country)
          ?.id
      );
      setValue("isAddressPublic", dataRegister.adopter?.isAddressPublic);
      setValue("addressPublic", dataRegister.adopter?.addressPublic);
      setValue("dni", dataRegister.adopter?.dni);
      setValue("firstName", dataRegister.adopter?.firstName);
      setValue("secondName", dataRegister.adopter?.secondName);
      setValue("firstLastName", dataRegister.adopter?.firstLastName);
      setValue("secondLastName", dataRegister.adopter?.secondLastName);
      setValue("birthDate", dataRegister.adopter?.birthDate);
      setValue("gender", dataRegister.adopter?.gender);
      setValue("cellphone", dataRegister.adopter?.cellphone);
      setValue("email", dataRegister.adopter?.email);
      setValue("department", dataRegister.adopter?.department);
      setValue("province", dataRegister.adopter?.province);
      setValue("district", dataRegister.adopter?.district);
      setValue("address", dataRegister.adopter?.address);
      setValue("registerEntity", dataRegister.adopter?.registerEntity);
      setValue("jurament1", dataRegister.adopter?.jurament1);
      setValue("isMicrochip", dataRegister.adopter?.isMicrochip);
      setValue("jurament3", dataRegister.adopter?.jurament3);
      setValue("jurament3", dataRegister.adopter?.jurament3);
      setValue("microchip", dataRegister.pet?.microchip);
      setValue("dateMicrochip", dataRegister.pet?.dateMicrochip);
      setValue("firstNamePet", dataRegister.pet?.firstNamePet);
      setValue("countryPet", dataRegister.pet?.countryPet);
      setValue("birthDatePet", dataRegister.pet?.birthDatePet);
      setValue("adoptionDate", dataRegister.pet?.adoptionDate);
      setValue("adoptionDate", dataRegister.pet?.adoptionDate);
      setValue("genderPet", dataRegister.pet?.genderPet);
      setValue("specie", dataRegister.pet?.specie);
      setValue("race", dataRegister.pet?.race);
      setValue("color", dataRegister.pet?.color);
      setValue("isSterilized", dataRegister.pet?.isSterilized);
      setValue("isPayment", dataRegister.isPayment);
      setValue("imagePet", dataRegister.imagePet?.imageUrl);
      setValue("fatherMicrochip", dataRegister.pet?.fatherMicrochip);
      setValue("motherMicrochip", dataRegister.pet?.motherMicrochip);
    }
  }, [dataRegister, codes]);

  useEffect(() => {
    sessionStorage.setItem("formDataCache", JSON.stringify(formDataCache));
  }, [formDataCache]);

  // console.log("data", dataRegister)
  // console.log("especies", watch("specie"))
  // console.log("especies", species, races)

  return (
    <PrimeReactProvider>
      <>
        {
          // mensaje por si se registro correctamente
          dataRegister?.status === "completed" &&
          pathname.split("/")[2] === "solicitud-de-registro" ? (
            <div className="w-full flex flex-col items-center justify-center gap-2 py-5 px-14 min-h-[80vh]">
              <div className="flex flex-col justify-center items-center border border-white py-10 px-3">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-10 text-gray-800 text-center md:w-9/12 lg:w-7/12 dark:text-white">
                  Se registro su respuesta!
                </h1>
                <p className="mt-10 text-base leading-normal text-center text-gray-600 md:w-9/12 lg:w-7/12 dark:text-white">
                  Gracias por rellenar el Formulario, pronto nos pondremos en
                  contacto con usted.
                </p>

                <div className=" w-40 h-40 mt-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-full h-full stroke-green-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <div className="mt-5 w-full flex justify-center">
                  <a
                    href="https://worldanimalregistry.org/es"
                    className="dark:text-white dark:border-white w-full sm:w-auto border border-gray-800 text-base font-medium text-gray-800 py-5 px-14 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-800 hover:text-white dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Seguir Navegando en el WAR
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={`w-full flex flex-col items-center justify-center gap-2 py-5 px-14 ${
                  currentMode === "Dark" ? "bg-slate-700" : "bg-[#eeeeee]"
                }`}
              >
                <h1 className="text-2xl font-bold">
                  SOLICITUD DE REGISTRO DE MASCOTA
                </h1>
                <p className="text-xl font-bold">
                  Creado en :
                  <span className="text-lg font-normal ml-2">
                    {dataRegister.createdAt
                      ? new Date(dataRegister.createdAt).toLocaleDateString()
                      : new Date().toLocaleDateString()}
                  </span>
                </p>
                {dataRegister.correlativeNumber && (
                  <span className="text-lg font-semibold ml-2">
                    {dataRegister.correlativeNumber.toString().padStart(8, "0")}
                  </span>
                )}

                <div className=" max-w-5xl w-full flex flex-col">
                  {/* <div className="flex justify-center py-3">
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className={`rounded-full hover:bg-green-600 text-white px-3 py-1 text-lg font-bold ${ step === 1 ? 'bg-green-500' : 'bg-green-700' }}`}
                        >
                            1
                        </button>

                        <div className='w-8 h-2 bg-green-400 mt-3'></div>

                        <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="rounded-full bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-lg font-bold"
                        >
                            2
                        </button>

                        <div className='w-8 h-2 bg-green-400 mt-3'></div>

                        <button
                            type="button"
                            onClick={() => setStep(3)}
                            className="rounded-full bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-lg font-bold"
                        >
                            3
                        </button>

                        <div className='w-8 h-2 bg-green-400 mt-3'></div>

                        <button
                            type="button"
                            onClick={() => setStep(4)}
                            className="rounded-full bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-lg font-bold"
                        >
                            4
                        </button>

                    </div>
                </div> */}

                  <div className="flex flex-row justify-center flex-wrap ">
                    <div
                      className={`max-w-${
                        flex ? "max-w-none" : "md pt-3"
                      } pr-2`}
                    >
                      <Step1
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        watch={watch}
                        reset={reset}
                        countries={countries}
                        step={step}
                        setStep={setStep}
                        codes={codes}
                      />
                    </div>

                    <div className={`${flex ? "max-w-none" : "max-w-md"} pl-2`}>
                      <Step2
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        watch={watch}
                        reset={reset}
                        step={step}
                        setStep={setStep}
                        codes={codes}
                        formDataCache={formDataCache}
                      />
                    </div>
                  </div>

                  <div className="flex flex-row justify-center  flex-wrap ">
                    <div className={`${flex ? "max-w-none" : "max-w-md"} pr-2`}>
                      <Step3
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        watch={watch}
                        reset={reset}
                        step={step}
                        setStep={setStep}
                        dataRegister={dataRegister}
                        isEdit={isEdit}
                        formDataCache={formDataCache}
                      />
                    </div>
                    <div className={`${flex ? "max-w-none" : "max-w-md"} pl-2`}>
                      <Step4
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        watch={watch}
                        reset={reset}
                        countries={countries}
                        species={species}
                        races={races}
                        colours={colours}
                        step={step}
                        setStep={setStep}
                        dataRegister={dataRegister}
                        formDataCache={formDataCache}
                      />
                    </div>
                  </div>
                  {dataRegister.id &&
                    pathname.split("/")[2] !== "solicitud-de-registro" && (
                      <div className="flex justify-center ">
                        <div className="flex w-full gap-2 max-w-md"></div>
                        <div className="flex w-full gap-2 max-w-md mt-2 mb-2 pl-3">
                          <FormSelect
                            label="¿El adoptante canceló su registro?"
                            property="isPayment"
                            options={[
                              {
                                value: true,
                                label: "SI",
                              },
                              {
                                value: false,
                                label: "NO",
                              },
                            ]}
                            values={register}
                            watch={watch}
                            setValue={setValue}
                            error={errors}
                            onChange={(target) => {
                              console.log(target.value);
                              setValue("isPayment", target.value);
                            }}
                            required
                          />
                        </div>
                      </div>
                    )}

                  <div className="w-full flex pt-4 items-center gap-2">
                    {dataRegister.id &&
                    pathname.split("/")[2] !== "solicitud-de-registro" ? (
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <span>Enviando</span>
                            <svg
                              className="animate-spin -mr-1 ml-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              ></path>
                            </svg>
                          </>
                        ) : (
                          <span>Actualizar</span>
                        )}
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-lg font-bold
                                                disabled:opacity-50 flex justify-center items-center gap-1 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <span>Enviando</span>
                            <svg
                              className="animate-spin -mr-1 ml-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              ></path>
                            </svg>
                          </>
                        ) : (
                          <span>Enviar</span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </>
          )
        }
        <div className="w-full flex flex-col items-center justify-center gap-2 lg:px-0 px-10 py-5">
          <p className="text-2xl font-bold">
            Puedes compartir este formulario con el siguiente código QR:
          </p>
          <div className="p-5 bg-white">
            <QRCode
              value={`https://registro.worldanimalregistry.org/formulario/solicitud-de-registro`}
              size={250}
            />
          </div>
        </div>
        <ButtonTop />
      </>
    </PrimeReactProvider>
  );
};
