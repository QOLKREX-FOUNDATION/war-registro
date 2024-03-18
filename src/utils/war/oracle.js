import { CONTRACTS_WAR } from "../../config/index";
import ORACLE from "../../config/abi/war/Oracle.json";
import { TOKENS } from "../../config/index";
import { ITokens } from "../../config/constants/tokens";
import { amountBig } from "../bigNumber";

export const estimateAmountOut = async (web3, tokenIn, amount) => {
  const tokenPrice = 0.002055;
	const changeToken = parseFloat(amount) / (tokenPrice);
	return +Number(amountBig(changeToken.toString(), 8)).toFixed(0);


  // const amountIn = amountBig(amount, TOKENS[tokenIn].decimals);
  // //50000000
  // try {
  //   const contract = new web3.eth.Contract(ORACLE, CONTRACTS_WAR.Oracle);
  //   const response = await contract.methods
  //     .estimateAmountOut(TOKENS[tokenIn].address, amountIn, 60)
  //     .call();
  //   return response;
  // } catch (e) {
  //   console.log(e);
  // }
};
