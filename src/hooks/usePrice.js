import { useEffect, useState } from "react";

export const usePrice = () => {
	const [coin, setCoin] = useState("");

	const [priceCoin, setPriceCoin] = useState(0);

	const [price, setPrice] = useState(0);

	useEffect(() => {
		setCoin(
			localStorage.getItem("coinWar") != null
				? String(localStorage.getItem("coinWar"))
				: "FIRU"
		);
	}, []);

	return {
		coin,
		setCoin,
		price,
		setPrice,
		priceCoin,
		setPriceCoin,
	};
};
