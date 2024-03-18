import { useEffect } from "react";
import { CHAIN_ID, TOKENS } from "../../../config";
import { useWeb3Context } from "../../../contexts";
import { useCurrentPrice } from "../../../hooks/useCurrentPrice";
import { amountBigReverse } from "../../../utils/bigNumber";
import { getAmountsIn } from "../../../utils/getAmountRouter";
import { chainIdValidate } from "../../../utils/wallet";
import { getPriceCompare } from "../../../utils/war/crud";
import { estimateAmountOut } from "../../../utils/war/oracle";

export const ChooseCurrency = ({
	contract,
	price,
	coin,
	setCoin,
	setPrice,
	priceCoin: value,
	setPriceCoin: setValue,
	variantPrice = 1,
}) => {
	const { web3 } = useWeb3Context();
	const { price: currentPrice } = useCurrentPrice();

	const handleCoin = ({ target }) => {
		setCoin(target.value);
		localStorage.setItem("coinWar", target.value);
	};

	useEffect(() => {
		if (
			web3.account != "" &&
			web3.wallet !== null &&
			chainIdValidate(web3.chainId, CHAIN_ID)
		) {
			getPriceCompare(web3.wallet, contract)
				.then((resolve) => {
					console.log("resolve", amountBigReverse(resolve, TOKENS["USDC"].decimals) / variantPrice);
					setPrice(
						amountBigReverse(resolve, TOKENS["USDC"].decimals) / variantPrice
					);
				})
				.catch((e) => console.log(e));
		}
	}, [web3.wallet, web3.account, web3.chainId, contract]);

	useEffect(() => {
		if (coin == "FIRU" && price > 0) {
			const firuConverted = price / 0.002055;
			setValue(firuConverted)
			// setValue(amountBigReverse(currentPrice, 8));
			// console.log(amountBigReverse(currentPrice, 8))
			// estimateAmountOut(web3.wallet, "USDC", price.toString())
			// 	.then((resolve) => {
			// 		if (resolve > 0) {
			// 		}
			// 	})
			// 	.catch((e) => console.log(e));
		} else {
			setValue(0);
		}
	}, [coin, web3.wallet, price, currentPrice]);

	return (
		<div className="flex gap-2 dark:text-white">
			<div className="whitespace-nowrap text-lg">
				<span >Costo de la operación: </span>
				<span className="font-medium opacity-70 ">
					{value > 0 ? value.toFixed(2) : price.toFixed(2)}
				</span>{" "}
			</div>
			<select
				className="rounded-lg border-transparent flex-1 appearance-none border border-zinc-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-xs focus:outline-none focus:ring-2 focus:border-transparent  dark:bg-slate-700 dark:text-white"
				name="status"
				id="status"
				value={coin}
				onChange={handleCoin}
			>
				<option value="FIRU">FIRU</option>
				<option value="USDC">cUSD</option>
			</select>
		</div>
	);
};
