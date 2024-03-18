import { useContext } from "react";
import { CorrelativeContext } from "../contexts/CorrelativeContext";
import { firuApi } from "../../api";
import { Web3Context } from "../contexts/Web3/Web3Context";

export const useCorrelative = () => {
  const { idCorrelative, setIdCorrelative } = useContext(CorrelativeContext);
  const { web3 } = useContext(Web3Context);

  const setStatusCorrelative = async (status = "") => {
    console.log({ idCorrelative, status });
    if (idCorrelative === "" || idCorrelative === undefined) return;
    if (status === "") return;

    console.log(web3.authToken, web3.account);

    const response = await firuApi
      .put(
        `/form/status/${idCorrelative}`,
        {
          status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-token": web3.authToken,
          },
        }
      )
      .then((response) => {
        console.log({ response });
        return response.data;
      })
      .catch((error) => {
        console.log({ error });
        return error;
      });
  };

  return {
    setStatusCorrelative,
  };
};
