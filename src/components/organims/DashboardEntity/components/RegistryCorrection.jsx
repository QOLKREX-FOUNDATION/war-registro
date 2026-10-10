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
import { useGlobal } from "../../../../hooks/useGlobal";
import { Web3Context } from "../../../../contexts/Web3/Web3Context";
import Swal from "sweetalert2";
import { API, IPFS } from "../../../../config";
import { imageURI } from "../../../../config/constants/endpoints";
import { upload } from "../../../../utils/war/pets";
import { getUserRegisteringEntity } from "../../../../utils/war/UsersSystem";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  // Legend
);

export const RegistryCorrection = () => {
  const [loader, setLoader] = useState(false);
  const { web3 } = useContext(Web3Context);
  const [isSearched, setIsSearched] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [mongoSearchError, setMongoSearchError] = useState("");
  const [file, setFile] = useState(null);
  // busca la mascota en la blockchain
  const {
    pets,
    status,
    search,
    setSearch,
    entityRegister,
    getSearch,
    searchError: ipfsSearchError,
  } = useGlobal();

  console.log(web3.authToken);
  console.log(pets);
  // console.log({ status });
  // console.log({ pets });

  // valida la relación usuario-entidad y registra la mascota en Mongo
  const handleSearchMongo = async () => {
    setLoader(true);
    setMongoSearchError("");
    setIsSearched(false);
    setIsRegistered(false);

    try {
      const userAddress = pets?.userAddress;
      const registeringEntityAddress = pets?.addressEr;
      if (
        !web3.networkWar.utils.isAddress(userAddress) ||
        !web3.networkWar.utils.isAddress(registeringEntityAddress)
      ) {
        throw new Error("El registro no contiene direcciones válidas.");
      }

      const assignedEntity = await getUserRegisteringEntity(
        web3.networkWar,
        userAddress,
      );
      if (
        assignedEntity.toLowerCase() !== registeringEntityAddress.toLowerCase()
      ) {
        await Swal.fire({
          icon: "warning",
          title: "Usuario no pertenece a la entidad",
          text: "No se guardó el registro. El usuario del registro no está asociado a la entidad registradora indicada.",
        });
        return;
      }

      await handleRegistry();
    } catch (error) {
      setMongoSearchError(
        error.response?.data?.msg ||
          error.message ||
          "No se pudo validar o registrar la mascota.",
      );
      await Swal.fire({
        icon: "error",
        title: "No se pudo completar la validación",
        text:
          error.response?.data?.msg ||
          error.message ||
          "Error al consultar o guardar la mascota en Mongo.",
      });
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleRegistry = async () => {
    const content = await fetch(`${API.war}pets`, {
      body: JSON.stringify({
        addressEr: pets?.addressEr,
        userAddress: pets?.userAddress,
        userName: pets?.userName,
        adopter: pets?.adopter,
        adopterName: pets?.adopterName,
        adopterLastName: pets?.adopterLastName,
        dateRegistring: pets?.dateRegistring,
        name: pets?.name,
        race: pets?.race,
        gender: pets?.gender,
        date: pets?.date,
        dateAdoption: pets?.dateAdoption,
        dateIssue: pets?.dateIssue,
        chip: pets?.chip,
        chipDate: pets?.chipDate,
        chipFather: pets?.chipFather,
        chipMother: pets?.chipMother,
        colour: pets?.colour,
        image: pets?.image,
        pedigree: pets?.pedigree,
        country: pets?.country,
        type: pets?.type,
        sterilized: pets?.sterilized,
        hash: pets?.hash,
        vaccines: pets?.vaccines,
        status: pets?.status,
        user: pets?.user,
        idRegisteringEntity: pets?.idRegisteringEntity,
        created_for: pets?.created_for,
        created_at: pets?.created_at,
        update_for: pets?.update_for,
        update_at: pets?.update_at,
        formId: pets?.formId,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-token": web3.authToken,
      },
      method: "POST",
    });

    const response = await content.json();
    if (!content.ok || response?.ok === false) {
      throw new Error(
        response?.msg || "Error al registrar la mascota en Mongo.",
      );
    }

    if (file) {
      upload(
        {
          name: "image",
          chip: pets?.chip,
          file,
        },
        web3.authToken,
      ).catch((error) => console.log(error));
    }

    setIsSearched(true);
    setIsRegistered(true);
    await Swal.fire({
      icon: "success",
      title: "Mascota registrada",
      text: "La relación usuario-entidad fue validada y la mascota se guardó en Mongo.",
    });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold py-2">
          Búsqueda de mascota en Blockchain:
        </h2>
        {loader && <p className="py-2">Validando y guardando...</p>}
        <div className="flex flex-row ">
          <div className="flex flex-col flex-wrap items-start gap-4">
            {/* search box pet */}
            <form
              className="flex flex-row items-start gap-4 "
              onSubmit={(e) => {
                e.preventDefault();
                getSearch(web3.wallet, search);
                setIsSearched(false);
                setIsRegistered(false);
                setMongoSearchError("");
                setFile(null);
              }}
            >
              <div className="flex flex-col">
                <label htmlFor="search" className="text-lg font-semibold">
                  Buscar por chip:
                </label>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className=" rounded-md px-4 py-2 w-80 dark:bg-gray-700 dark:text-white border-black dark:border-white border-2"
                  // value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span className="text-xs text-gray-400">
                  número de caracteres: {search.length} / 15 (máximo)
                </span>
              </div>
              <button
                type="submit"
                className="bg-sky-500 text-white px-4 py-2 rounded-md mt-7 basis-0 h-10"
                // onClick={() => getSearch(web3.wallet, "")}
              >
                Buscar
              </button>
              {/* <button
                type="button"
                className="bg-sky-500 text-white px-4 py-2 rounded-md mt-2 basis-0 h-10"
                onClick={() => {
                  setSearch("");
                  getSearch(web3.wallet, "");
                }}
              >
                Limpiar
              </button> */}
            </form>
            <div className="flex flex-col gap-2 mt-2">
              {(ipfsSearchError || mongoSearchError) && (
                <p role="alert">{ipfsSearchError || mongoSearchError}</p>
              )}
              {/* {status === "ACTIVE" && ( */}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold">Resultados:</h2>
                {pets.addressEr ? (
                  <>
                    <div className="flex gap-2">
                      <div className="flex flex-col">
                        <label htmlFor="image">
                          Agregar imagen de la mascota:
                        </label>
                        <input
                          type="file"
                          name="image"
                          id="image"
                          className=" rounded-md px-4 py-2 w-80 dark:bg-gray-700 dark:text-white border-black dark:border-white border-2"
                          onChange={handleFile}
                          // value={file}
                          accept="image/*"
                        />
                        {}
                      </div>
                      {/* previsual */}
                      {file && (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="pet"
                          className="w-20 h-24 block object-contain object-center rounded-md"
                        />
                      )}
                    </div>
                    <img
                      src={`${IPFS}${pets?.image}`}
                      // src={`${imageURI}/${pets.chip}`}
                      alt="pet"
                      className="w-64 h-52 block object-contain object-center rounded-md border"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                    {/* <button className="text-blue-500" onClick={handleDownload}>
                      descargar
                    </button> */}
                    <div className="flex max-w-md overflow-y-auto">
                      <pre className="text-gray-400">
                        {JSON.stringify(pets, null, 2)}
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

          {pets.addressEr && (
            <>
              <div className="flex py-5 px-2">
                <button
                  type="button"
                  disabled={loader || isRegistered}
                  className="bg-sky-500 text-white px-4 py-2 rounded-md mt-2 h-10"
                  onClick={() => {
                    // setLoader(true);
                    // firuApi
                    //   .put(`/pet/${pet._id}`, {
                    //     ...pet,
                    //     entityRegister,
                    //   })
                    //   .then((response) => {
                    //     setLoader(false);
                    //     console.log(response);
                    //   })
                    //   .catch((error) => {
                    //     setLoader(false);
                    //     console.log(error);
                    //   });
                    handleSearchMongo();
                  }}
                >
                  Validar
                </button>
              </div>
              {isSearched && (
                <div className="flex flex-col gap-2 mt-2">
                  <h2 className="text-xl font-semibold">Resultado:</h2>
                  <p>
                    {isRegistered
                      ? "La mascota se guardó en Mongo."
                      : "La mascota ya estaba registrada en Mongo."}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center">
          {/* list reuslts firulaix */}
        </div>
        {/* boton cargar a mongo */}
      </div>
    </>
  );
};
