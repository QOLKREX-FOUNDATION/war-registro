import { CONTRACTS_WAR } from "../../config/index";
import ABIADMIN from "../../config/abi/war/Administrators.json";

export const getPermission = async (web3, account) => {
	try {
		const contract = new web3.eth.Contract(
			ABIADMIN,
			CONTRACTS_WAR.Administrators
		);
		const response = await contract.methods.getPermission(account).call();
		return response;
	} catch (e) { 
		console.log(e);
	}
};
