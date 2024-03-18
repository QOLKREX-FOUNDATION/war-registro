import { CONTRACTS_WAR } from "../../config/index";
import ABIER from "../../config/abi/war/RegisteringEntities.json";
import ABIERSTATUS from "../../config/abi/war/RegisteringEntitiesStatus.json";

import { toChecksumAddress } from "./address";


export const registeringEntity = async (web3, account) => {
	try {
		const address = toChecksumAddress(web3, account);
		const contract = new web3.eth.Contract(
			ABIERSTATUS,
			CONTRACTS_WAR.RegisteringEntitiesStatus
		);
		const response = await contract.methods.registeringEntity(address).call();
		return response;
	} catch (e) {
		console.log(e);
	}
};


export const getAccess = async (web3, account, access) => {
	try {
		const address = toChecksumAddress(web3, account);
		const contract = new web3.eth.Contract(
			ABIER,
			CONTRACTS_WAR.RegisteringEntities
		);
		const response = await contract.methods.getAccess(address, access).call();
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const getEntityAll = async (web3) => {

	try {
		const contract = new web3.eth.Contract(
			ABIER,
			CONTRACTS_WAR.RegisteringEntities
		);
		const response = await contract.methods.getEntityAll().call();
		return response;
	} catch (e) {

		console.log(e);
	}
};

export const getIds = async (web3, account) => {
	try {
		const address = toChecksumAddress(web3, account);
		const contract = new web3.eth.Contract(
			ABIERSTATUS,
			CONTRACTS_WAR.RegisteringEntitiesStatus
		);
		const response = await contract.methods.getIds(address).call();
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const getResponsibility = async (web3, account) => {
	try {
		const address = toChecksumAddress(web3, account);
		const contract = new web3.eth.Contract(
			ABIER,
			CONTRACTS_WAR.RegisteringEntities
		);
		const response = await contract.methods.getResponsibility(address).call();
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const price = async (web3) => {
	try {
		const contract = new web3.eth.Contract(
			ABIER,
			CONTRACTS_WAR.RegisteringEntities
		);
		const response = await contract.methods.price().call();
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const setRegisteringEntity = async (
	web3,
	account,
	address,
	permission,
	data,
	max,
	time,
	operation,
	access,
	accessValues,
	idPermission) => {
	try {
		account = toChecksumAddress(web3, account);
		address = toChecksumAddress(web3, address);
		const contract = new web3.eth.Contract(
			ABIER,
			CONTRACTS_WAR.RegisteringEntities
		);
		const response = await contract.methods
			.setRegisteringEntity(
				address,
				permission,
				data,
				max,
				time,
				operation,
				access,
				accessValues,
				idPermission
			)
			.send({ from: account, value: 0 });
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const setRenovation = async (
	web3,
	account,
	max,
	amountOut,
	amountInMax,
	coin
) => {
	try {
		account = toChecksumAddress(web3, account);
		const contract = new web3.eth.Contract(
			ABIER,
			CONTRACTS_WAR.RegisteringEntities
		);
		const response = await contract.methods
			.setRenovation(max, amountOut, amountInMax, coin)
			.send({ from: account, value: 0 });
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const setIncrementMax = async (
	web3,
	account,
	increment,
	amountOut,
	amountInMax,
	coin
) => {
	try {
		const contract = new web3.eth.Contract(
			ABIER,
			CONTRACTS_WAR.RegisteringEntities
		);
		const response = await contract.methods
			.setIncrementMax(increment, amountOut, amountInMax, coin)
			.send({ from: account, value: 0 });
		return response;
	} catch (error) {
		console.log(error);
	}
};