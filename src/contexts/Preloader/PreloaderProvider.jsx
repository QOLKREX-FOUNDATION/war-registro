import { useState } from "react";
import { PreloaderContext } from "./PreloaderContext";

const INIT_STATE = {
	preloader: false,
};

export const PreloaderProvider = ({ children }) => {
	const [preloader, setPreloader] = useState(INIT_STATE);

	const handlePreloader = (value) => {
		setPreloader({
			preloader: value,
		});
	};

	return (
		<PreloaderContext.Provider value={{ preloader, handlePreloader }}>
			{children}
		</PreloaderContext.Provider>
	);
};
