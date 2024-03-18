import ERC20ABI from "../config/abi/erc20.json";
import { TOKENS } from "../config/index";
import { amountBigReverse } from "./bigNumber";
import { CHAIN_ID } from "../config";

const getBalanceCrypto = async (web3, account) => {
	try {
		const balance = web3.utils.fromWei(
			await web3.eth.getBalance(account),
			"ether"
		);
		return parseFloat(balance);
	} catch (e) {
		return 0.0;
	}
};

const getBalanceToken = async (web3, account, address, decimals) => {
	try {
		const contract = new web3.eth.Contract(ERC20ABI, address);
		const balance = await contract?.methods.balanceOf(account).call();
		return amountBigReverse(balance, decimals);
	} catch (e) {
		console.log(e);
		return 0.0;
	}
};

export const getBalance = async (
	web3,
	chainId,
	account,
	id,
	production = true
) => {
	try {
		if (parseInt(chainId, 16) === parseInt(CHAIN_ID, 16) || !production) {
			const response =
				id === "MOVR"
					? await getBalanceCrypto(web3, account)
					: await getBalanceToken(
							web3,
							account,
							TOKENS[id].address,
							TOKENS[id].decimals
					  );
			return response;
		} else {
			return 0.0;
		}
	} catch (e) {
		console.log(e);
		return 0.0;
	}
};
