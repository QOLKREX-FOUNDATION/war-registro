import { useContext, useState } from "react";
import { PreloaderContext } from "../../../../contexts/Preloader/PreloaderContext";
import { orderJson } from "../utils/orderJson";
import { setData } from "../../../../utils/war/crud";
import { getAmountsIn } from "../../../../utils/getAmountRouter";
import { amountFiruUSDC } from "../../../../utils/bigNumber";
import { toastMessage } from "../../../../utils/toastMessage";
import { toFileWeb3Storage } from "../../../../utils/war/toFileWe3Storage";
import { handlePost } from "../../../../utils/war/pets";
import { TOKENS } from "../../../../config";
import {
  imageFileToWeb3StorageUtils,
  imageFileUpload,
} from "../utils/imageFileToWeb3StorageUtils";
import { estimateAmountOut } from "../../../../utils/war/oracle";

export const useRegister = ({
  update = false,
  request = {},
  handleSelection = undefined,
  petInit,
}) => {
  const { handlePreloader } = useContext(PreloaderContext);
  const [image, setImage] = useState("");
  const [pedigree, setPedigree] = useState("");

  const imageFileToWeb3Storage = ({ watchPet }) => {
    imageFileToWeb3StorageUtils({
      handlePreloader,
      watchPet,
      setImage,
      setPedigree,
    });
  };

  const handleFinish = async ({
    web3,
    account,
    price,
    coin,
    token,
    getPet,
    watchPet,
    reset,
  }) => {
    handlePreloader(true);
    const info = orderJson({
      getPet,
      account,
      update,
      image,
      pedigree,
      petInit,
    });
    if (!info || !!!info?.image) {
      toastMessage({
        type: "error",
        text: "Error en la sesión actual",
      });
      handlePreloader(false);
      return false;
    }

    const blob = new Blob([JSON.stringify(info)], { type: "application/json" });
    toFileWeb3Storage(blob, `${info.chip}.json`)
      .then((cid) => {
        if (cid) {
          info.url = cid;
          console.log("price", price); //0.5
          estimateAmountOut(web3, "USDC", price) //625,02927047
            .then((responseAmount) => {
              console.log("responseAmount", responseAmount);
              setData(
                web3,
                account,
                update ? 2 : 1,
                info.type,
                info.url,
                info.chip,
                web3.utils.toChecksumAddress(info.adopter),
                amountFiruUSDC(coin, price, responseAmount),
                amountFiruUSDC(coin, price, responseAmount, 2),
                coin == "FIRU" ? TOKENS.FIRU.address : TOKENS.USDC.address
              ).then((response) => {
                if (
                  response?.transactionHash != "" &&
                  response?.transactionHash != undefined
                ) {
                  info.hash = response.transactionHash;
                  // if (request[0] != undefined && request[1] != undefined) {
                  // 	handlePostAdopter(objAdopter, token, "POST");
                  // 	post(
                  // 		`${API.firulaix}request-register/${request[2]}`,
                  // 		new FormData(),
                  // 		"PUT"
                  // 	)
                  // 		.then(() => {
                  // 			handleSelection("list");
                  // 		})
                  // 		.catch((e) => {
                  // 			message("danger", "app.error");
                  // 			handlePreloader(false);
                  // 		});
                  // }
                  toastMessage({ text: "Registro Realizado Exitosamente" });
                  handlePost(info, token, update ? "PUT" : "POST")
                    .then(() => {
                      imageFileUpload({
                        watchPet,
                        token,
                      });
                      reset();
                    })
                    .catch((e) => console.log(e));
                  handlePreloader(false);
                } else {
                  toastMessage({
                    type: "error",
                    text: "Error al guardar en Blockchain",
                  });
                  handlePreloader(false);
                }
              });
            })
            .catch((e) => {
              console.log(e);
              toastMessage({
                type: "error",
                text: "Error al consultar precio",
              });
              handlePreloader(false);
            });
        } else {
          toastMessage({
            type: "error",
            text: "Error al guardar data en el IPFS",
          });
          handlePreloader(false);
        }
      })
      .catch((e) => {
        toastMessage({ type: "error", text: "Error, Aplicación" });
        handlePreloader(false);
      });
  };

  return {
    image,
    pedigree,
    handleFinish,
    imageFileToWeb3Storage,
  };
};
