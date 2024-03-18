import { useEffect, useState } from "react";
import { useWeb3Context } from "../contexts";
import { handleValidate } from "../utils/war/auth";
import { getConnected } from "../utils/web3";

export const useConnect = () => {
	const { web3, handleToken, handleWeb3 } = useWeb3Context();
	const [auth, setAuth] = useState(true);
	const [logged, setLogged] = useState(false);

	useEffect(() => {
		if (!sessionStorage.getItem("auth_token") ) {
			getConnected().then(
				(response) =>
					response && handleWeb3(response.provider, response.providerString)
			);
		}
	}, []);

	const userToken = () => {
		setAuth(false)
		handleToken(
			sessionStorage.getItem(
				"auth_token_" + String(web3.account).toUpperCase() ?? ""
			),
			sessionStorage.getItem(
				"auth_timeOut_" + String(web3.account).toUpperCase() ?? ""
			)
		);
		handleValidate(
			sessionStorage.getItem(
				"auth_token_" + String(web3.account).toUpperCase() ?? ""
			),
			sessionStorage.getItem(
				"auth_timeOut_" + String(web3.account).toUpperCase() ?? ""
			),
			setAuth,
			setLogged
		);
	};

	const adopterToken = () => {
		handleToken(
			sessionStorage.getItem("auth_token"),
			sessionStorage.getItem("auth_timeOut"),
			sessionStorage.getItem("rol")
		);
		handleValidate(
			sessionStorage.getItem("auth_token"),
			sessionStorage.getItem("auth_timeOut"),
			setAuth,
			setLogged
		);
	};

	return {
		auth,
		logged,
		adopterToken,
		userToken,
	};
};
