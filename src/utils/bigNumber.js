import Web3 from "web3";
import { TOKENS } from "../config";

const web3 = new Web3();

export const amountMax =
	"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

export const amountBig = (amount, decimals) => {
	const resolve =
		decimals === 18
			? web3.utils.toWei(amount, "ether")
			: parseFloat(amount) * Number(`1e+${decimals}`);
	return resolve;
};

export const amountBigReverse = (amount, decimals) => {
	const resolve = parseFloat(amount) / Number(`1e+${decimals}`);
	return resolve;
};

export const amountFiruUSDC = (coin, price, amount, mul = 0) => {
	return coin == "FIRU"
		? (amount + (mul > 0 ? 10 ** 7 : 0)).toString()
		: amountBig(price, TOKENS["USDC"].decimals).toString();
};
