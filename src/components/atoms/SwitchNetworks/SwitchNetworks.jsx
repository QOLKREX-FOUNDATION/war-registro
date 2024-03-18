import { NETWORK_MAINNET, PRODUCTION } from "../../../config";
import { useWeb3Context } from "../../../contexts";
import { useStateContext } from "../../../contexts/ContextProvider";
import { changeNetwork } from "../../../utils/wallet";
import { CardContainer } from "../../containers/CardContainer";

export const SwitchNetworks = () => {
	const { currentColor } = useStateContext();

	const { web3, handleChainId } = useWeb3Context();
	return (
		<div className="flex items-center justify-center h-screen w-full ">
			<div className="w-1/2 ">
				<CardContainer>
					<section className="p-3">
						<img
							alt="moto"
							src="/svg/metamask-logo.svg"
							className="absolute -right-20 -bottom-8 h-40 w-40 mb-4"
						/>
						<div className="w-4/6">
							<p className="text-amber-600 text-lg font-medium mb-2">
								Metamask
							</p>
							<p className="text-gray-400 text-xs">
								Inicia sesion con Metamask para obtener acceso a la plataforma
								de registro.
							</p>
							<div className="mt-3">
								<button
									className="py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
									style={{ background: currentColor }}
									onClick={() =>
										changeNetwork(web3.wallet, handleChainId, NETWORK_MAINNET)
									}
								>
									Cambiar red a {PRODUCTION ? "CELO" : "TESTNET"} para
									continuar
								</button>
							</div>
						</div>
					</section>
				</CardContainer>
			</div>
		</div>
	);
};
