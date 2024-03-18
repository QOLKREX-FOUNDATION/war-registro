import { useEffect } from "react";
import { useWeb3Context } from "../../../contexts";
import { ValidateNetWorks } from "./ValidateTokenUser";
import { SwitchNetworks } from "../SwitchNetworks/SwitchNetworks";
import { useEventsProvider } from "../../../hooks/useEventsProvider";
import { CHAIN_ID } from "../../../config";
import { getConnected, web3Provider } from "../../../utils/web3";

export const UserPrivate = ({ children }) => {
	const { web3, handleAccount, handleChainId, handleWeb3 } = useWeb3Context();

	const { accountsChanged, chainChanged } = useEventsProvider(
		handleAccount,
		handleChainId
	);

	useEffect(() => {
		web3Provider(handleWeb3, "metamask", false);
		getConnected().then(
			(response) =>
				response && handleWeb3(response.provider, response.providerString)
		);
	}, []);

	useEffect(() => {
		web3.provider?.on("accountsChanged", accountsChanged);
		return () =>
			web3.provider?.removeListener("accountsChanged", accountsChanged);
	}, [handleAccount, web3.provider, accountsChanged]);

	useEffect(() => {
		web3.provider?.on("chainChanged", chainChanged);
		return () => web3.provider?.removeListener("chainChanged", chainChanged);
	}, [handleChainId, web3.provider, chainChanged]);


	return (
		<>
			{CHAIN_ID === web3.chainId ? (
				<ValidateNetWorks>{children}</ValidateNetWorks>
			) : (
				<SwitchNetworks />
			)}
		</>
	);
};
