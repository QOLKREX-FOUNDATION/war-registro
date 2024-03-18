import { useContext, useState } from "react";
import {
  getInfoStatus,
  getSearch as getSearchContract,
} from "../utils/war/bridge";
import { PreloaderContext } from "../contexts/Preloader/PreloaderContext";
import { registeringEntity } from "../utils/war/RegisteringEntities";

export const useGlobal = () => {
  const [pets, setPets] = useState({});
  const { handlePreloader } = useContext(PreloaderContext);
  const [status, setStatus] = useState("");

  const [entityRegister, setEntityRegister] = useState({});
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setPets({});
  };

  const get = async (url) => {
    try {
      const rawResponse = await fetch(url);
      console.log({ rawResponse });
      const content = await rawResponse.json();
      console.log({ content });
      return content;
    } catch (error) {
      console.log(error);
    }
  };

  const getSearch = (web3, value = "") => {
    handlePreloader(true);
    setLoading(true);
    reset();
    getInfoStatus(web3, value != "" ? value : search)
      .then((resolve4) => setStatus(resolve4))
      .catch((e) => console.log(e));

    getSearchContract(web3, value != "" ? value : search)
      .then((resolve) => {
        return get(resolve);
      })
      .then((resolve2) => {
        resolve2.image = resolve2?.image.replace("ipfs://", "");
        resolve2.pedigree = resolve2?.pedigree.replace("ipfs://", "");
        setPets(resolve2);
        return registeringEntity(
          web3,
          web3.utils.toChecksumAddress(resolve2.addressEr)
        );
      })
      .then((resolve3) => {
        setEntityRegister(
          resolve3?.data != "" && resolve3?.data != undefined
            ? JSON.parse(Buffer.from(resolve3.data, "base64").toString())
            : ""
        );
        handlePreloader(false);
        setLoading(false);
        setSearchActive(true);
      })
      .catch((e) => {
        console.log(e);
        setSearchActive(true);
        setLoading(false);
        handlePreloader(false);
      });
  };

  return {
    pets,
    status,
    search,
    entityRegister,
    searchActive,
    loading,
    getSearch,
    setSearch,
  };
};
