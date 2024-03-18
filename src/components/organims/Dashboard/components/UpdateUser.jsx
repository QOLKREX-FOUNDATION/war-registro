import React, { useContext, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { useState } from "react";
import { firuApi } from "../../../../../api";
import { Web3Context } from "../../../../contexts/Web3/Web3Context";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useDocuments } from "../../../molecules/Adopter/Search/hooks/useDocuments";
import documentsJson from "../../../../../public/Json/documents.json";
import { useCountry } from "../../../../hooks/useCountry";
import { usePerson } from "../../../molecules/Adopter/Search/hooks/usePerson";

export const UpdateUser = () => {
  const [loader, setLoader] = useState(false);
  const { web3 } = useContext(Web3Context);
  const [mongoPet, setMongoPet] = useState({});
  const [isSearched, setIsSearched] = useState(false);
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      search: "",
    },
  });

  const {
    watch: watchUpdate,
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    setValue: setValueUpdate,
    formState: { errors: errorsUpdate },
    reset: resetUpdate,
    setError: setErrorUpdate,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      country: "PE",
      person: "NATURAL",
      document: "D.N.I.",
    },
  });

  const { persons } = usePerson();
  const { countries } = useCountry();
  const { documents, handleDocuments } = useDocuments();

  // busca la mascota en la blockchain
  // const { pets, status, search, setSearch, entityRegister, getSearch } =
  //   useGlobal();

  // console.log({ status });
  // console.log({ pets });

  // busca la mascota en la base de datos de mongo
  const handleSearchMongo = (data) => {
    setLoader(true);
    firuApi
      .get(`/adopters/search/${data.search}`, {
        headers: {
          "x-token": web3.authToken,
        },
      })
      .then((response) => {
        setLoader(false);
        console.log(response);
        setMongoPet(response.data);
        Swal.fire({
          icon: "success",
          title: "Adoptante encontrada",
          text: "El Adoptante fue encontrada en la base de datos de Mongo",
        });
        setIsSearched(true);
        setValueUpdate("country", response.data.adopter.country);
        setValueUpdate("person", response.data.adopter.person);
        setValueUpdate("document", response.data.adopter.document);
      })
      .catch((error) => {
        setLoader(false);
        Swal.fire({
          icon: "error",
          title: "Adoptante no encontrada",
          text: "El Adoptante no fue encontrada en la base de datos de Mongo",
        });
        console.log(error);
        setIsSearched(true);
      });
  };

  // registra la mascota en la base de datos de mongo
  const handleRegistry = (data) => {
    console.log({ data });
    console.log(mongoPet.adopter);
    firuApi
      .put(`adopters/update-document/${mongoPet.adopter._id}`, data, {
        headers: {
          "x-token": web3.authToken,
        },
      })
      .then((response) => {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Adoptante actualizado",
          text: "El Adoptante fue actualizado en la base de datos de Mongo",
        });
        resetUpdate();
        setIsSearched(false);
        setMongoPet({});
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Adoptante no actualizado",
          text: "El Adoptante no fue actualizado en la base de datos de Mongo",
        });
      });

    // const token = web3.authToken;

    // const content = await fetch(`${API.war}adopters/${id}`, {
    //   body: JSON.stringify({
    //     addressEr: pets?.userAddress,
    //     userAddress: pets?.userAddress,
    //     userName: pets?.userName,
    //     adopter: pets?.adopter,
    //     adopterName: pets?.adopterName,
    //     adopterLastName: pets?.adopterLastName,
    //     dateRegistring: pets?.dateRegistring,
    //     name: pets?.name,
    //     race: pets?.race,
    //     gender: pets?.gender,
    //     date: pets?.date,
    //     dateAdoption: pets?.dateAdoption,
    //     dateIssue: pets?.dateIssue,
    //     chip: pets?.chip,
    //     chipDate: pets?.chipDate,
    //     colour: pets?.colour,
    //     image: pets?.image,
    //     pedigree: pets?.pedigree,
    //     country: pets?.country,
    //     type: pets?.type,
    //     sterilized: pets?.sterilized,
    //     hash: pets?.hash,
    //     vaccines: pets?.vaccines,
    //     status: pets?.status,
    //     user: pets?.user,
    //     idRegisteringEntity: pets?.idRegisteringEntity,
    //     created_for: pets?.created_for,
    //     created_at: pets?.created_at,
    //     update_for: pets?.update_for,
    //     update_at: pets?.update_at,
    //     formId: pets?.formId,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //     "x-token": token,
    //   },
    //   method: "POST",
    // });
    // const response = await content.json();
    // console.log({ response });
    // return response;
  };

  useEffect(() => {
    handleDocuments(
      setValueUpdate,
      watchUpdate("country"),
      watchUpdate("person")
    );
  }, []);

  useEffect(() => {
    handleDocuments(
      setValueUpdate,
      watchUpdate("country"),
      watchUpdate("person")
    );
  }, [watchUpdate("country"), watchUpdate("person")]);

  // console.log({ pets });
  console.log({ countries });
  console.log({ persons });
  console.log({ documents });
  console.log({ mongoPet });

  const handleValidateDocument = (e) => {
    console.log(e.target.value);
    const validDocument = firuApi
      .get(`/adopters/search/${e.target.value}`, {
        headers: {
          "x-token": web3.authToken,
        },
      })
      .then((response) => {
        console.log(response);
        setErrorUpdate("documentNumber", {
          type: "validate",
          message: "Este documento ya se encuentra registrado",
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log({ validDocument });
    console.log(watchUpdate("document"));
  };

  return (
    <>
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold py-2">
          Búsqueda de nascota en Blockchain:
        </h2>
        {loader && (
          <div className="flex flex-col items-center justify-center h-auto absolute w-full">
            <h2 className="text-xl font-semibold py-2">Cargando...</h2>
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-40 w-40 border-l-transparent animate-spin"></div>
          </div>
        )}

        <div className="flex xl:flex-row flex-col">
          <div className="flex flex-col flex-wrap items-start gap-4">
            {/* search box pet */}
            <form
              className="flex flex-row items-end gap-4 "
              onSubmit={handleSubmit(handleSearchMongo)}
            >
              <div className="flex flex-col">
                <label htmlFor="search" className="text-lg font-semibold">
                  Buscar por documento:
                </label>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className=" rounded-md px-4 py-2 w-80 dark:bg-gray-700 dark:text-white border-white border-2"
                  {...register("search", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                />
                {
                  <span className="text-red-500 text-sm">
                    {errors?.search?.message}
                  </span>
                }
              </div>
              <div className="flex gap-2 h-full pt-5">
                <button
                  type="submit"
                  className="bg-sky-500 text-white px-4 py-2 rounded-md mt-2 basis-0 h-10"
                  // onClick={() => getSearch(web3.wallet, "")}
                >
                  Buscar
                </button>
                <button
                  type="button"
                  className="bg-sky-500 text-white px-4 py-2 rounded-md mt-2 basis-0 h-10"
                  onClick={() => {
                    reset();
                    setIsSearched(false);
                    setMongoPet({});
                  }}
                >
                  Limpiar
                </button>
              </div>
            </form>
            <div className="flex flex-col gap-2 mt-2">
              {/* {status === "ACTIVE" && ( */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold">Resultados:</h2>
                {mongoPet ? (
                  <>
                    <div className="flex max-w-md overflow-y-auto">
                      <pre className="text-gray-400">
                        {JSON.stringify(mongoPet, null, 2)}
                      </pre>
                    </div>
                  </>
                ) : (
                  <h2 className="text-lg font-semibold">
                    No se encontraron resultados
                  </h2>
                )}
              </div>
              {/* )} */}
            </div>
          </div>

          <div className="flex w-full">
            <div className="flex flex-col gap-2 w-full items-center">
              <h2 className="text-xl font-semibold">Formulario:</h2>
              {mongoPet ? (
                <>
                  <form
                    className="max-w-md mx-auto w-full"
                    onSubmit={handleSubmitUpdate(handleRegistry)}
                  >
                    <div className="relative z-0 w-full mb-5 group">
                      <label
                        htmlFor="country"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Seleccione el País
                      </label>
                      <select
                        id="country"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...registerUpdate("country", {
                          required: {
                            value: true,
                            message: "Este campo es requerido",
                          },
                          onChange: (e) => {
                            console.log({ e });
                            setValueUpdate("country", e.target.value);
                            watchUpdate("country") !== ""
                              ? watchUpdate("country")
                              : localStorage.getItem("countryCode") ?? "PE",
                              watchUpdate("person");
                          },
                        })}
                      >
                        {countries.map((country) => (
                          <option key={country.value} value={country.value}>
                            {country.label}
                          </option>
                        ))}
                      </select>
                      {
                        <span className="text-red-500 text-sm">
                          {errorsUpdate?.country?.message}
                        </span>
                      }
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                      <label
                        htmlFor="person"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Tipo de Persona
                      </label>
                      <select
                        id="person"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...registerUpdate("person", {
                          required: {
                            value: true,
                            message: "Este campo es requerido",
                          },
                          onChange: (e) => {
                            setValueUpdate("person", e.target.value);
                            handleDocuments(
                              setValueUpdate,
                              watchUpdate("country"),
                              e.target.value
                            );
                          },
                        })}
                      >
                        {persons.map((person) => (
                          <option key={person.value} value={person.value}>
                            {person.label}
                          </option>
                        ))}
                      </select>
                      {
                        <span className="text-red-500 text-sm">
                          {errorsUpdate?.person?.message}
                        </span>
                      }
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                      <label
                        htmlFor="document"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Seleccione el tipo de documento
                      </label>
                      <select
                        id="document"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...registerUpdate("document", {
                          required: {
                            value: true,
                            message: "Este campo es requerido",
                          },
                          onChange: (e) => {
                            console.log(e);
                            setValueUpdate("document", e.target.value);
                          },
                        })}
                      >
                        {documents.map((document) => (
                          <option key={document.value} value={document.value}>
                            {document.label}
                          </option>
                        ))}
                      </select>
                      {
                        <span className="text-red-500 text-sm">
                          {errorsUpdate?.document?.message}
                        </span>
                      }
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="documentNumber"
                        id="documentNumber"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        // placeholder="Número de documento"
                        {...registerUpdate("documentNumber", {
                          required: {
                            value: true,
                            message: "Este campo es requerido",
                          },
                          minLength: {
                            value: watchUpdate("document") === "D.N.I." ? 7 : 8,
                            message: "Formato incorrecto",
                          },
                          maxLength: {
                            value:
                              watchUpdate("document") === "D.N.I." ? 8 : 14,
                            message: "Formato incorrecto",
                          },
                          onBlur: (e) => {
                            handleValidateDocument(e);
                          },
                        })}
                      />
                      <label
                        htmlFor="documentNumber"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Número de documento{" "}
                        {watchUpdate("documentNumber")?.length} /{" "}
                        {watchUpdate("document") === "D.N.I."
                          ? `8`
                          : `entre 8 a 14 dígitos`}
                      </label>
                      {
                        <span className="text-red-500 text-sm">
                          {errorsUpdate?.documentNumber?.message}
                        </span>
                      }
                    </div>
                    <button
                      type="submit"
                      className="bg-sky-500 text-white px-4 py-2 rounded-md mt-2 basis-0 h-10 w-full"
                    >
                      Actualizar
                    </button>
                  </form>
                </>
              ) : (
                <h2 className="text-lg font-semibold">
                  No se encontraron resultados
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
