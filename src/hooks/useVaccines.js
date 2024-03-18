import { useState } from "react";
import { useContext } from "react";
import { initValuesVaccines } from "../components/molecules/Vaccines/initValuesVaccines";
import { formatDataPet } from "../components/organims/Cpanel/components/PetForm/utils/formatDataPet";
import { PreloaderContext } from "../contexts/Preloader/PreloaderContext";
import { objectUppercase } from "../utils/helpers";
import { toastMessage } from "../utils/toastMessage";
import { setVaccinesBlockchain } from "../utils/war/bridge";
import { getRecordPet, handlePost } from "../utils/war/pets";
import { toFileWeb3Storage } from "../utils/war/toFileWe3Storage";

export const useVaccines = () => {
  const { handlePreloader } = useContext(PreloaderContext);
  const [update, setUpdate] = useState({ index: -1, image: "" });
  const [image, setImage] = useState("");

  const [petValues, setPetValues] = useState({});

  const reset = () => {
    setUpdate({ index: -1, image: "" });
  };

  const getSearch = ({ chip, token }) => {
    handlePreloader(true);
    getRecordPet(`chip=${chip}`, token)
      .then((response) => {
        response.pet = formatDataPet(response.pet);
        setPetValues(response.pet);
        handlePreloader(false);
      })
      .catch((e) => {
        console.log(e);
        handlePreloader(false);
      });
  };

  const handleFinish = ({
    web3,
    account,
    token,
    petValues,
    vaccine,
    resetVaccine,
    index = -1,
    method = "save",
  }) => {
    handlePreloader(true);
    let vaccinesList = [];

    if (method === "update") {
      petValues.vaccines[update.index] = vaccine;
      vaccinesList = petValues.vaccines;
    } else if (method === "delete") {
      petValues.vaccines.map(
        (value, i) => i !== index && vaccinesList.push(value)
      );
    } else {
      vaccinesList = petValues?.vaccines ?? [];
      vaccinesList.push({
        ...objectUppercase(vaccine, ["image"]),
      });
    }

    const info = { ...petValues, vaccines: vaccinesList };
    postVaccines({ info, petValues, web3, account, token, resetVaccine });
  };

  const postVaccines = ({
    info,
    petValues,
    web3,
    account,
    token,
    resetVaccine,
    method = "PUT",
  }) => {
    handlePreloader(true);
    const blob = new Blob([JSON.stringify(info)], { type: "application/json" });
    toFileWeb3Storage(blob, `${info.chip}.json`)
      .then((cid) => {
        if (cid) {
          info.url = cid;
          setVaccinesBlockchain(web3, account, petValues.chip, cid)
            .then((response) => {
              if (
                response?.transactionHash != "" &&
                response?.transactionHash != undefined
              ) {
                handlePost(info, token, method)
                  .then(() => getSearch({ chip: petValues.chip, token }))
                  .catch((e) => console.log(e));

                toastMessage({ text: "Registro Realizado Exitosamente" });
                resetVaccine(initValuesVaccines);
                reset();
                handlePreloader(false);
              } else {
                toastMessage({
                  type: "error",
                  text: "Error al guardar en Blockchain",
                });
                handlePreloader(false);
              }
            })
            .catch((e) => {
              toastMessage({
                type: "error",
                text: "Se detuvo la operación",
              });
              handlePreloader(false);
            });
        } else {
          toastMessage({
            type: "error",
            text: "No pudo generarse el hash en el IPFS",
          });
          handlePreloader(false);
        }
      })
      .catch((e) => {
        toastMessage({
          type: "error",
          text: "Error, No pudo guardarse en el IPFS",
        });
        handlePreloader(false);
      });
  };

  return {
    update,
    setUpdate,
    handleFinish,
    reset,
    image,
    setImage,
    petValues,
    getSearch,
  };
};
