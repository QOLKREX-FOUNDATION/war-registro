import ERC20ABI from "../config/abi/erc20.json";
import { TOKENS } from "../config";
import { amountMax } from "./bigNumber";

export const approve = async (web3, account, token, spender) => {
  try {
    const BN = amountMax;
    const contract = new web3.eth.Contract(ERC20ABI, TOKENS[token].address, {
      from: account,
    });
    await contract?.methods.approve(spender, BN).send();
  } catch (error) {
    console.log(error);
  }
};

export const allowance = async (web3, account, token, spender) => {
  try {
    if (
      web3?.eth !== undefined &&
      account !== undefined &&
      TOKENS[token].type === "token"
    ) {
      const contract = new web3.eth.Contract(ERC20ABI, TOKENS[token]?.address);
      const response = await contract.methods
        .allowance(account, spender)
        .call();
      return response;
    }
    return 1;
  } catch (error) {
    console.log(error);
  }
};

export const transfer = async (web3, account, token, to, amount) => {
  try {
    const contract = new web3.eth.Contract(ERC20ABI, TOKENS[token].address);
    const response = await contract.methods
      .transfer(to, amount)
      .send({ from: account });
    return response;
  } catch (error) {
    console.log(error);
  }
};
