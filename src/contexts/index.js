import { useContext } from "react";
import { PreloaderContext } from "./Preloader/PreloaderContext";
import { Web3Context } from "./Web3/Web3Context";

export const useWeb3Context = () => useContext(Web3Context);
export const usePreloaderContext = () => useContext(PreloaderContext);