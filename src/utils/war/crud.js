import { CONTRACTS_WAR } from "../../config/index";
import ABICRUD from "../../config/abi/war/Crud.json";

export const getPriceCompare = async (web3, contractString) => {
  try {
    const contract = new web3.eth.Contract(ABICRUD, CONTRACTS_WAR.Crud);
    const response = await contract.methods
      .getPriceCompare(contractString)
      .call();
    return response;
  } catch (e) {
    console.log(e);
  }
};

/**
 *
 * FALTA EL GETAMOUNTOUT del swap
 *
 *
 *
 */

export const setData = async (
  web3,
  account,
  action,
  contractSpecie,
  hash,
  cod,
  address,
  amountOut,
  amountInMax,
  coin
) => {
  console.log({
    web3,
    account,
    action,
    contractSpecie,
    hash,
    cod,
    address,
    amountOut,
    amountInMax,
    coin,
  });

  try {
    const contract = new web3.eth.Contract(ABICRUD, CONTRACTS_WAR.Crud);
    if (action === 1) {
      return await contract.methods
        .saveNFT(
          contractSpecie,
          hash,
          cod,
          address,
          amountOut,
          amountInMax,
          coin
        )
        .send({ from: account });
    } else {
      return await contract.methods
        .updateNFT(contractSpecie, hash, cod, amountOut, amountInMax, coin)
        .send({ from: account });
    }
  } catch (error) {
    console.log(error);
  }
};

export const setDelete = async (web3, account, contractSpecie, cod) => {
  try {
    const contract = new web3.eth.Contract(ABICRUD, CONTRACTS_WAR.Crud);
    const response = await contract.methods
      .setDelete(contractSpecie, cod)
      .send({ from: account });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const transferNft = async (
  web3,
  account,
  contractSpecie,
  hash,
  cod,
  address,
  to,
  amountOut,
  amountInMax,
  coin
) => {
  try {
    const contract = new web3.eth.Contract(ABICRUD, CONTRACTS_WAR.Crud);
    const response = await contract.methods
      .transferNft(
        contractSpecie,
        hash,
        cod,
        address,
        to,
        amountOut,
        amountInMax,
        coin
      )
      .send({ from: account });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const transferEr = async (
  web3,
  account,
  contractSpecie,
  hash,
  cod,
  idTranfer,
  amountOut,
  amountInMax,
  coin
) => {
  try {
    const contract = new web3.eth.Contract(ABICRUD, CONTRACTS_WAR.Crud);
    const response = await contract.methods
      .transferEr(
        contractSpecie,
        hash,
        cod,
        idTranfer,
        amountOut,
        amountInMax,
        coin
      )
      .send({ from: account });
    return response;
  } catch (error) {
    console.log(error);
  }
};
