import { Web3Provider } from "./contexts/Web3/Web3Provider";
import { PreloaderProvider } from "./contexts/Preloader/PreloaderProvider";
import { WarProvider } from "./contexts/War/WarContext";
import { InfoByIpProvider } from "./contexts/InfoByIp/InfoByIpProvider";

export const Provider = ({ children }) => {
	return (
		<WarProvider>
			<Web3Provider>
				<PreloaderProvider>
					<InfoByIpProvider>{children}</InfoByIpProvider>
				</PreloaderProvider>
			</Web3Provider>
		</WarProvider>
	);
};
