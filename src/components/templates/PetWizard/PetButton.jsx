import { useEffect, useState } from "react";
import { CHAIN_ID, CONTRACTS_WAR, TOKENS } from "../../../config";
import { useWeb3Context } from "../../../contexts";
import { getBalance } from "../../../utils/balance";
import { chainIdValidate } from "../../../utils/wallet";
import { allowance } from "../../../utils/er20";
import { useAprovate } from "../../../hooks/useAprovate";
import { amountBigReverse } from "../../../utils/bigNumber";
import { useContext } from "react";

export const PetButton = ({
	image,
	pedigree,
	handleFinish,
	price,
	coin,
	priceCoin,
	getPet,
	reset,
	watchPet,
	update = false,
}) => {
	const { web3 } = useWeb3Context();

	const { approvate, handleApprove, setApprovate } = useAprovate();
	const [balance, setBalance] = useState(0);

	console.log("click", priceCoin.toString());
	const handleClick = () => {
		console.log("click", price.toString());
		handleFinish({
			web3: web3.wallet,
			account: web3.account,
			price: price.toString(),
			coin:
				localStorage.getItem("coinWar") != null
					? String(localStorage.getItem("coinWar"))
					: "FIRU",
			token: web3.authToken,
			getPet,
			reset,
			watchPet,
		});
	};

	useEffect(() => {
		if (web3.account != "") {
			getBalance(web3.wallet, CHAIN_ID, web3.account, coin, false)
				.then((resolve) => {
					setBalance(resolve);
				})
				.catch((e) => console.log(e));
		}
	}, [web3.account, web3.wallet, , coin]);

	useEffect(() => {
		web3.account != "" &&
			web3.wallet !== null &&
			chainIdValidate(web3.chainId, CHAIN_ID) &&
			allowance(web3.wallet, web3.account, coin, CONTRACTS_WAR.Crud)
				.then((resolve) => {
					setApprovate(resolve);
				})
				.catch((e) => console.log(e));
	}, [web3.account, web3.wallet, web3.chainId, coin]);

	return (
		<div>
			{priceCoin > approvate && (
				<button
					className="py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-yellow-500"
					onClick={() =>
						handleApprove(web3.wallet, web3.account, coin, CONTRACTS_WAR.Crud)
					}
				>
					Aprobar
				</button>
			)}

			{approvate >= priceCoin && priceCoin > balance && (
				<button className="py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-yellow-500 opacity-90">
					<>Saldo Insuficiente {coin}</>
				</button>
			)}

			{approvate >= priceCoin &&
				balance >= priceCoin &&
				(update || !!image) && (
					<button
						className="py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-green-500"
						onClick={handleClick}
					>
						{update ? "Actualizar " : "Registrar"}
					</button>
				)}
		</div>
	);
};
