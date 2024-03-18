import { initAccessValuesReset } from "../../components/atoms/Wallet/utils";

const getPermisition = (account) => {
	if (account) {
		let permisition = JSON.parse(
			sessionStorage.getItem("userPermission_" + String(account).toUpperCase())
		);
		permisition = permisition ? permisition : initAccessValuesReset();
		return permisition;
	} else {
		return initAccessValuesReset();
	}
};

export const permisionActive = (account, module, value) => {
	const permisition = getPermisition(account);
	let bandera = permisition[module][value] ?? 0;

	return bandera > 0 ? true : false;
};

export const isModule = (account, module) => {
	const permisition = getPermisition(account);

	let bandera = false;
	for (let i = 1; i < permisition[module].length; i++) {
		const permisition = getPermisition(account);
		if (permisition[module][i] > 0) bandera = true;
	}

	return bandera;
};

export const isUser = (account) => {
	const permisition = getPermisition(account);
	let bandera = false;
	for (let i = 1; i < permisition.length; i++) {
		for (let j = 1; j < permisition[i].length; j++) {
			if (permisition[i][j] > 0) bandera = true;
		}
	}
	return bandera;
};
