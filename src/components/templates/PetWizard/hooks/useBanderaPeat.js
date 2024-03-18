import { useState } from "react";
import { getSearch } from "../../../../utils/war/bridge";

export const useBanderaPeat = (update) => {
	const [banderaPet, setBanderaPet] = useState(false);

	const handleChip = (web3, chip) => {
		getSearch(web3, chip)
			.then((r) => {
				if (update) {
					r != undefined ? setBanderaPet(false) : setBanderaPet(true);
				} else if (!update) {
					r != undefined ? setBanderaPet(true) : setBanderaPet(false);
				}
			})
			.catch((e) => {
				"error";
			});
	};

	return {
		banderaPet,
		setBanderaPet,
		handleChip,
	};
};
