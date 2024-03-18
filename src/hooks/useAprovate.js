import { useState } from "react";
import { usePreloaderContext } from "../contexts";
import { allowance, approve } from "../utils/er20";
import { TOKENS } from "../config";
import { amountBigReverse } from "../utils/bigNumber";

export const useAprovate = () => {
	const [approvate, setApprovate] = useState(0);
	const { handlePreloader } = usePreloaderContext();

	const handleApprove = (web3, account, coin, contract) => {
		handlePreloader(true);
		approve(web3, account, coin, contract)
			.then(() => {
				allowance(web3, account, coin, contract)
					.then((resolve) => {
						setApprovate(resolve > 0 ? allowanceComparative(resolve, coin) : 0);
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

	const allowanceComparative = (approvate, coin) => {
		if (!approvate) return 0;
		const decimal = TOKENS[coin].decimals;
		return amountBigReverse(approvate.toString(), decimal);
	};

	return { approvate, setApprovate, handleApprove };
};
