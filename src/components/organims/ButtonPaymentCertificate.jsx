import { useContext, useEffect, useState } from "react";
// import { CHAIN_ID, CONTRACTS_WAR } from "../../../config";
import { CHAIN_ID, CONTRACTS_WAR, TOKENS } from "../../config";
import { useWeb3Context } from "../../contexts";
import { getBalance } from "../../utils/balance";
import { chainIdValidate } from "../../utils/wallet";
import { allowance } from "../../utils/er20";
import { useAprovate } from "../../hooks/useAprovate";
import { toastMessage } from "../../utils/toastMessage";
import { estimateAmountOut } from "../../utils/war/oracle";
import { PreloaderContext } from "../../contexts/Preloader/PreloaderContext";
import { amountFiruUSDC } from "../../utils/bigNumber";
import { transfer } from "../../utils/er20";
import { setCost } from "../../utils/war/cost";
// import { setData } from "../../utils/war/crud";

export const ButtonPaymentCertificate = ({
  handleFinish,
  price,
  coin,
  priceCoin,
}) => {
  const { web3 } = useWeb3Context();
  const { handlePreloader } = useContext(PreloaderContext);

  const { approvate, handleApprove, setApprovate } = useAprovate();
  const [balance, setBalance] = useState(0);

  //payment
  const handlePayment = async ({ web3, price, account, coin }) => {
    handlePreloader(true);
    // console.log("web3", web3);
    // console.log("price", price);

    const responseAmount = await estimateAmountOut(web3, "USDC", price);
    // console.log("responseAmount", responseAmount);

    // const response = await transfer(
    //   web3,
    //   account,
    //   "0x6E8c30f31aF6a5a860aCfDd1d312773cFb280B14",
    //   "0x4415B2Bfc4445b33C17c1A0b0D10cC18e9F928D0",
    //   amountFiruUSDC(coin, price, responseAmount)
    // );
    const response = await setCost(
      web3,
      account,
      amountFiruUSDC(coin, price, responseAmount),
      amountFiruUSDC(coin, price, responseAmount, 2),
      amountFiruUSDC(coin, price, responseAmount)
    );
    // coin == "FIRU" ? TOKENS.FIRU.address : TOKENS.USDC.address

    // console.log("response", response);

    if (
      response?.transactionHash != "" &&
      response?.transactionHash != undefined
    ) {
      toastMessage({ text: "Se descargo Exitosamente" });
      handleFinish();
      // handleClick();
      handlePreloader(false);
    } else {
      toastMessage({
        type: "error",
        text: "Error al guardar en Blockchain",
      });
      handlePreloader(false);
    }

    // coin == "FIRU" ? TOKENS.FIRU.address : TOKENS.USDC.address

    // estimateAmountOut(web3, "USDC", price) //625,02927047
    //   .then((responseAmount) => {
    //     console.log("responseAmount", responseAmount);
    //     setData(
    //       web3,
    //       account,
    //       2,
    //       "",
    //       "",
    //       "",
    //       web3.utils.toChecksumAddress(CONTRACTS_WAR.Crud),
    //       amountFiruUSDC(coin, price, responseAmount),
    //       amountFiruUSDC(coin, price, responseAmount, 2),
    //       coin == "FIRU" ? TOKENS.FIRU.address : TOKENS.USDC.address
    //     ).then((response) => {
    //       if (
    //         response?.transactionHash != "" &&
    //         response?.transactionHash != undefined
    //       ) {
    //         console.log("responseAmount", response);
    //         toastMessage({ text: "Se descargo Exitosamente" });
    //         handleFinish();
    //         // handleClick();
    //         handlePreloader(false);
    //       } else {
    //         toastMessage({
    //           type: "error",
    //           text: "Error al guardar en Blockchain",
    //         });
    //         handlePreloader(false);
    //       }
    //     });
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     toastMessage({
    //       type: "error",
    //       text: "Error al consultar precio",
    //     });
    //     handlePreloader(false);
    //   });
  };

  console.log("click", priceCoin.toString());
  const handleClick = () => {
    console.log("click", price.toString());
    handlePayment({
      web3: web3.wallet,
      price: price.toString(),
      account: web3.account,
      coin:
        localStorage.getItem("coinWar") != null
          ? String(localStorage.getItem("coinWar"))
          : "FIRU",
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
          console.log({ resolve });
          setApprovate(resolve);
        })
        .catch((e) => console.log(e));
  }, [web3.account, web3.wallet, web3.chainId, coin]);

  console.log({
    priceCoin: parseFloat(priceCoin),
    approvate: parseFloat(approvate),
    balance: parseFloat(balance),
  });

  return (
    <div>
      {parseFloat(priceCoin) > parseFloat(approvate) && (
        <button
          className="py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-yellow-500"
          onClick={() =>
            handleApprove(web3.wallet, web3.account, coin, CONTRACTS_WAR.Crud)
          }
        >
          Aprobar
        </button>
      )}

      {parseFloat(approvate) >= parseFloat(priceCoin) &&
        parseFloat(balance) < parseFloat(priceCoin) && (
          <button className="py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-yellow-500 opacity-90">
            <>Saldo Insuficiente {coin}</>
          </button>
        )}

      {parseFloat(approvate) >= parseFloat(priceCoin) &&
        parseFloat(balance) >= parseFloat(priceCoin) && (
          <button
            className="py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-green-500"
            onClick={handleClick}
          >
            Descargar Certificado
          </button>
        )}
    </div>
  );
};
