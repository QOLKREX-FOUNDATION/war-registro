import { CONTRACTS, SWAPABI, SWAPROUTERABI } from "../config/index";
import { TOKENS } from "../config/index";
import { amountBig, amountBigReverse } from "./bigNumber";

export const getAmountOutMin = async (web3, token0, token1, amount) => {
	try {
		const contract = new web3.eth.Contract(SWAPABI, CONTRACTS.swap);
		const BN = amountBig(amount, TOKENS[token0].decimals);
		const path = [TOKENS[token0].address, TOKENS[token1].address];
		const response = {
			value: await contract?.methods.getAmountOutMin(path, BN).call(),
			route: {
				path,
				id: [token0, token1],
			},
		};

		response.value = amountBigReverse(response.value, TOKENS[token1].decimals);
		response.value = response.value.toFixed(4).toString();
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const getAmountsIn = async (web3, token0, token1, amount) => {
	try {
		const contract = new web3.eth.Contract(SWAPROUTERABI, CONTRACTS.swapRouter);

		const BN = amountBig(amount, TOKENS[token1].decimals);
		const path = [TOKENS[token0].address, TOKENS[token1].address];
		const response = {
			value: await contract?.methods.getAmountsIn(BN, path).call(),
			route: {
				path,
				id: [token0, token1],
			},
		};
		return response;
	} catch (error) {
		console.log(error);
	}
};
