import { CONTRACTS_WAR } from "../../config/index";
import ABIERC20 from "../../config/abi/erc20.json";

export const setCost = async (web3, account, amount) => {
  console.log({
    amount,
  });

  //   tocheckSumAddress(account)

  const addressEx = web3.utils.toChecksumAddress(
    "0x4415B2Bfc4445b33C17c1A0b0D10cC18e9F928D0"
  );

  try {
    const contract = new web3.eth.Contract(ABIERC20, CONTRACTS_WAR.Erc20);
    return await contract.methods
      .transfer(addressEx, amount)
      .send({ from: account });
  } catch (error) {
    console.log(error);
  }
};
