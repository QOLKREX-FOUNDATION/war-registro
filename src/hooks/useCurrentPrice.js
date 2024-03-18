import { useState, useEffect } from "react";
import CELO from "../config/abi/celoRouter.json";
import Web3 from "web3";
export const useCurrentPrice = () => {
  const [price, setPrice] = useState(0);
  const web3 = new Web3(
    "https://celo-mainnet.infura.io/v3/6bbfcbeb9e0d49ae80b539a6daa4fdf6"
  );
  const contract = new web3.eth.Contract(
    CELO,
    "0xE3D8bd6Aed4F159bc8000a9cD47CffDb95F96121"
  );

  const path = [
    "0x765DE816845861e75A25fCA122bb6898B8B1282a",
    "0x6E8c30f31aF6a5a860aCfDd1d312773cFb280B14",
  ];

  const BN = web3.utils.toWei("1", "ether");

  const getPrice = async () => {
    const price = await contract.methods.getAmountsOut(BN, path).call();
    setPrice(price[1]);
  };

  useEffect(() => {
    getPrice();
  }, []);

  return {
    price,
  };
};
