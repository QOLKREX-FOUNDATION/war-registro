import { NETWORKS } from "../config/constants/networks";

export const getAccounts = async (web3, handleAccount) => {
	try {
		const accounts = await web3.eth.getAccounts();
		handleAccount(accounts[0]);
	} catch (e) {
		return false;
	}
};

export const getChainId = async (web3) => await web3.eth.getChainId();

// Funciona solo en Metamask
export const addToken = async (token) => {
	try {
		await window.ethereum.request({
			method: "wallet_watchAsset",
			params: {
				type: "ERC20",
				options: {
					address: token.address,
					symbol: token.symbol,
					decimals: token.decimals,
					image: token.image,
				},
			},
		});
	} catch (e) {
		console.log(e);
	}
};

// Funciona solo en Metamask
export const changeNetwork = async (web3, handleChainId, network) => {
	try {
		await web3.currentProvider.request({
			method: "wallet_addEthereumChain",
			params: [
				{
					...NETWORKS[network],
				},
			],
		});
		getChainId(web3).then(
			(resolve) =>
				resolve === NETWORKS[network].chainId &&
				handleChainId(NETWORKS[network].chainId)
		);
		return true;
	} catch (e) {
		console.log(e);
	}
};

export const chainIdValidate = (chainId, chainIdV) => {
	const comprobeA =
		typeof chainId === "string" ? parseInt(chainId, 16) : chainId;
	const comprobeB =
		typeof chainIdV === "string" ? parseInt(chainIdV, 16) : chainIdV;
	return comprobeA === comprobeB;
};
