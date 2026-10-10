import { useContext, useState } from "react";
import {
  getInfoStatus,
  getSearch as getSearchContract,
} from "../utils/war/bridge";
import { PreloaderContext } from "../contexts/Preloader/PreloaderContext";
import { registeringEntity } from "../utils/war/RegisteringEntities";
import { IPFS } from "../config";

export const useGlobal = () => {
  const [pets, setPets] = useState({});
  const { handlePreloader } = useContext(PreloaderContext);
  const [status, setStatus] = useState("");

  const [entityRegister, setEntityRegister] = useState({});
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const reset = () => {
    setPets({});
  };

  const get = async (url) => {
    const rawResponse = await fetch(url);
    if (!rawResponse.ok) {
      throw new Error(`El gateway IPFS respondió HTTP ${rawResponse.status}`);
    }
    return rawResponse.json();
  };

  const resolveIpfsUrl = (url) => {
    if (url.startsWith("ipfs://")) {
      return `${IPFS}${url.slice("ipfs://".length).replace(/^ipfs\//, "")}`;
    }

    try {
      const parsedUrl = new URL(url);
      const ipfsPath = parsedUrl.pathname.match(/\/ipfs\/(.+)$/);
      return ipfsPath
        ? `${IPFS}${ipfsPath[1]}${parsedUrl.search}${parsedUrl.hash}`
        : url;
    } catch {
      return url;
    }
  };

  const getSearch = (web3, value = "") => {
    handlePreloader(true);
    setLoading(true);
    setSearchError("");
    reset();
    getInfoStatus(web3, value != "" ? value : search)
      .then((resolve4) => setStatus(resolve4))
      .catch((e) => console.log(e));

    getSearchContract(web3, value != "" ? value : search)
      .then((url) => {
        if (!url) {
          throw new Error("No se encontró una URL IPFS para este chip");
        }
        return get(resolveIpfsUrl(url));
      })
      .then((resolve2) => {
        if (!resolve2 || typeof resolve2 !== "object") {
          throw new Error("El contenido IPFS no tiene un formato válido");
        }
        resolve2.image = resolve2.image?.replace("ipfs://", "");
        resolve2.pedigree = resolve2.pedigree?.replace("ipfs://", "");
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
        console.error("Error al buscar el registro en blockchain/IPFS:", e);
        setSearchError(e.message || "No se pudieron cargar los datos IPFS");
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
    searchError,
    loading,
    getSearch,
    setSearch,
  };
};
