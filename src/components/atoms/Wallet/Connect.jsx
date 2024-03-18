import { Informative } from "../../molecules/modals/Informative/Informative";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { Web3Context } from "../../../contexts/Web3/Web3Context";
import { web3Provider } from "../../../utils/web3";
import { Sign } from "../Sign";
import { CHAIN_ID, NETWORK_MAINNET, PRODUCTION } from "../../../config";
import { chainIdValidate, changeNetwork } from "../../../utils/wallet";
import { useEventsProvider } from "../../../hooks/useEventsProvider";

export const Connect = ({ handleClose }) => {
  const { web3, handleWeb3, handleAccount, handleChainId } =
    useContext(Web3Context);
  const { accountsChanged, chainChanged } = useEventsProvider(
    handleAccount,
    handleChainId
  );

  const validate = (providerString) => {
    web3Provider(handleWeb3, providerString, true);
  };

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
    <Informative handleClose={handleClose}>
      <div className="px-2 py-8">
        <div className="self-center mb-3 text-lg font-bold text-cyan-500">
          Conectar
        </div>
        <div className="text-sm text-gray-400 mb-3">
          Al conectar una billetera, acepta los Términos de servicio de Firulaix
          Labs y reconoce que ha leído y entendido el Protocolo de exención de
          responsabilidad.
        </div>
        {!web3.account && (
          <div
            // className={classes.wallet}
            onClick={() => validate("metamask")}
            className="font-medium	bg-slate-50 duration-500 cursor-pointer flex items-center justify-between px-4 py-2 rounded-md border border-transparent  hover:bg-transparent hover:border-slate-300"
          >
            Metamask
            <div style={{ width: "3rem" }}>
              <Image
                src="/svg/metamask-logo.svg"
                layout="responsive"
                width={30}
                height={30}
                alt="image"
              />
            </div>
          </div>
        )}
        {web3.account && (
          <i className="block	text-center text-sm text-gray-500 mb-2">{`${web3.account}`}</i>
        )}
        {web3.account && !chainIdValidate(web3.chainId, CHAIN_ID) && (
          <button
            type="button"
            className="py-2 px-4  bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 focus:ring-offset-cyan-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
            onClick={() =>
              changeNetwork(web3.wallet, handleChainId, NETWORK_MAINNET)
            }
          >
            Cambiar a {PRODUCTION ? "CELO" : "TESTNET"}
          </button>
        )}

        {web3.account && chainIdValidate(web3.chainId, CHAIN_ID) && <Sign />}

        {/* <div>
						<div className="relative">
							<Image
								src="/img/icons/metamask.png"
								layout="fill"
								objectFit="contain"
								alt="metamask"
							/>
						</div>
					</div> */}
        {/* <div className={classes.wallet}
					onClick={() => validate("walletconnect")}>
					WalletConnect
					<div>
						<div className="relative">
							<Image
								src="/img/icons/walletconnect.png"
								layout="fill"
								objectFit="contain"
								alt="WalletConnect"
							/>
						</div>
					</div>
				</div> */}
      </div>
    </Informative>
  );
};
