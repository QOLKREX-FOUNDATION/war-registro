// import WalletConnectProvider from "@walletconnect/web3-provider";

const metamaskInstall = () => {
	window.open(
		"https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=es",
		"_blank",
		"noopener"
	);
	return true;
};

export const providers = (string) => {
	switch (string) {
		// case "walletconnect":
		//   return new WalletConnectProvider({
		//     rpc: {
		//       97: "https://data-seed-prebsc-1-s1.binance.org:8545",
		//       1285: "https://moonriver.api.onfinality.io/rpc?apikey=4cc1072b-afe8-4d8d-b11b-53b298e6e6bc",
		//     },
		//     qrcodeModalOptions: {
		//       mobileLinks: ["metamask", "trust"],
		//     },
		//     chainId: 1285,
		//   });

		default:
			return typeof window.ethereum !== "undefined"
				? window.ethereum
				: { validate: true };
	}
};

export const validateMetamask = async(provider, message) => {
	provider.validate && message && metamaskInstall();
	if (!provider.validate) {
		await window.ethereum.providers?.find !== undefined
			? window.ethereum.providers.find((provider) => {
					provider.isMetaMask &&
						window.ethereum
							.request({ method: "eth_requestAccounts" })
							.then(() => false)
							.catch((e) => console.log(e));
			  })
			: window.ethereum.request({ method: "eth_requestAccounts" });
	}
};
