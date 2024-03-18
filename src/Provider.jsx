import { Web3Provider } from "./contexts/Web3/Web3Provider";
import { PreloaderProvider } from "./contexts/Preloader/PreloaderProvider";

export const Provider = ({ children }) => {
	return (
		<Web3Provider>
			<PreloaderProvider>{children}</PreloaderProvider>
		</Web3Provider>
	);
};
