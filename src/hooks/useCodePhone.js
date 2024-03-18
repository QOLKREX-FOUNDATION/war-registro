import { useContext } from "react";
import { firuApi } from "../../api";
import { Web3Context } from "../contexts/Web3/Web3Context";
import { useState } from "react";

export const useCodePhone = () => {
  const [codes, setCode] = useState([]);
  const [codesData, setCodesData] = useState({});
  const { web3 } = useContext(Web3Context);

  const getCodes = (limit = 100, offset = 0, search = "") => {
    if (search !== "") {
      firuApi
        .get(`/code?limit=${limit}&offset=${offset}&search=${search}`, {
          headers: {
            "x-token": web3.authToken,
          },
        })
        .then((res) => {
          console.log(res);
          setCode(res.data.codes);
          setCodesData({
            total: res.data.total,
            pagination: res.data.pagination,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }

    console.log("getCodes");
    firuApi
      .get(`/code?limit=${limit}&offset=${offset}`, {
        headers: {
          "x-token": web3.authToken,
        },
      })
      .then((res) => {
        setCode(res.data.codes);
        console.log(res);
        setCodesData({
          total: res.data.total,
          pagination: res.data.pagination,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    codes,
    codesData,
    getCodes,
  };
};
