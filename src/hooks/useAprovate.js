import { useState } from "react";
import { usePreloaderContext } from "../contexts";
import { allowance, approve } from "../utils/er20";

export const useAprovate = () => {
	const [approvate, setApprovate] = useState(0);
	const { handlePreloader } = usePreloaderContext();

	const handleApprove = (web3, account, coin, contract) => {
		handlePreloader(true);
		approve(web3, account, coin, contract)
			.then(() => {
				allowance(web3, account, coin, contract)
					.then((resolve) => {
						resolve > 0 ? setApprovate(resolve) : setApprovate(0);
						handlePreloader(false);
					})
					.catch((e) => {
						console.log(e);
						handlePreloader(false);
					});
			})
			.catch((e) => {
				console.log(e);
				handlePreloader(false);
			});
	};

	return { approvate, setApprovate, handleApprove };
};
