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
import { useGlobal } from "../../../../hooks/useGlobal";
import { Web3Context } from "../../../../contexts/Web3/Web3Context";
import Swal from "sweetalert2";
import { API } from "../../../../config";
import { imageURI } from "../../../../config/constants/endpoints";
import { upload } from "../../../../utils/war/pets";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
  // Legend
);

export const RegistryCorrection = () => {
  const [loader, setLoader] = useState(false);
  const { web3 } = useContext(Web3Context);
  const [mongoPet, setMongoPet] = useState({});
  const [isSearched, setIsSearched] = useState(false);
  const [file, setFile] = useState(null);
  // busca la mascota en la blockchain
  const { pets, status, search, setSearch, entityRegister, getSearch } =
    useGlobal();

  console.log(web3.authToken);
  console.log(pets);
  // console.log({ status });
  // console.log({ pets });

  // busca la mascota en la base de datos de mongo
  const handleSearchMongo = () => {
    setLoader(true);
    firuApi
      .get(`/pets?chip=${search}`)
      .then((response) => {
        setLoader(false);
        console.log(response);
        setMongoPet(response.data);
        Swal.fire({
          icon: "success",
          title: "Mascota encontrada",
          text: "La mascota fue encontrada en la base de datos de Mongo, no es necesario cargarla nuevamente",
        });
        setIsSearched(true);
      })
      .catch((error) => {
        setLoader(false);
        Swal.fire({
          icon: "error",
          title: "Mascota no encontrada",
          text: "La mascota no fue encontrada en la base de datos de Mongo, es necesario cargarla",
        });
        console.log(error);
        setIsSearched(true);
      });
  };

  // registra la mascota en la base de datos de mongo
  const handleRegistry = async () => {
    try {
      // const content = await fetch(`${API.war}adopters`, {
      const content = await fetch(`${API.war}pets`, {
        body: JSON.stringify({
          addressEr: pets?.userAddress,
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

      if (file) {
        upload(
          {
            name: "image",
            chip: pets?.chip,
            file: file,
          },
          web3.authToken
        )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      const response = await content.json();
      console.log({ response });
      Swal.fire({
        icon: "success",
        title: "Mascota registrada",
        text: "La mascota fue registrada en la base de datos de Mongo",
      });
      // return response;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Mascota no registrada",
        text: "La mascota no fue registrada en la base de datos de Mongo",
      });
      console.log({ error });
    }
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  // const handleDownload = () => {
  //   const downloadLink = document.createElement("a");
  //   downloadLink.href = `https://ipfs.io/ipfs/${pets?.image}`;
  //   downloadLink.download = "nombre-del-archivo"; // Establece el nombre del archivo deseado
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  //   document.body.removeChild(downloadLink);
  // };

  console.log({ pets });
  console.log({ mongoPet });
  console.log({ file });

  console.log(`https://ipfs.io/ipfs/${pets.image}`);

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

        <div className="flex flex-row ">
          <div className="flex flex-col flex-wrap items-start gap-4">
            {/* search box pet */}
            <form
              className="flex flex-row items-start gap-4 "
              onSubmit={(e) => {
                e.preventDefault();
                getSearch(web3.wallet, search);
                setIsSearched(false);
                setMongoPet({});
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
                      src={`https://ipfs.io/ipfs/${pets?.image}`}
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
                <div className="">
                  {mongoPet?.pet?._id ? (
                    <div className="flex flex-col gap-2 mt-2">
                      <h2 className="text-xl font-semibold">Resultado:</h2>
                      <div className="flex flex-col gap-2">
                        <h2>La mascota ya está registrada</h2>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 mt-2">
                      <h2 className="text-xl font-semibold">
                        Puedes insertarlo en la base de datos de mongo:
                      </h2>
                      <div className="flex flex-col gap-2">
                        <h2>La mascota no está registrada</h2>
                        <button
                          className="bg-sky-500 text-white px-4 py-2 rounded-md mt-2 h-10"
                          onClick={() => {
                            handleRegistry();
                          }}
                        >
                          Registrar
                        </button>
                      </div>
                    </div>
                  )}
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
